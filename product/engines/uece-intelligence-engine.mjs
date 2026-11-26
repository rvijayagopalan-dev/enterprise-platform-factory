/**
 * UECE Capability Intelligence Engine v0.1.0
 * Dependency-free reference implementation. Node.js 18+ / modern browsers.
 * This is a deterministic prototype, not a production authorization or persistence layer.
 */
export const APPLICABILITY = new Set(["unassessed","applicable","conditional","not_applicable","externally_provided","planned"]);
export const MAPPING_TYPES = new Set(["reuse","specialization","extension","addition","alias","replacement_proposal"]);
export const HIERARCHY_PREDICATES = new Set(["parentOf","childOf"]);

export function stableStringify(value) {
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  if (value && typeof value === "object") {
    return "{" + Object.keys(value).sort().map(k => JSON.stringify(k)+":"+stableStringify(value[k])).join(",") + "}";
  }
  return JSON.stringify(value);
}

// Non-cryptographic content fingerprint for reproducibility tests only.
// Replace with SHA-256 in a production service.
export function fingerprint(value) {
  const input = typeof value === "string" ? value : stableStringify(value);
  let h = 2166136261;
  for (let i=0;i<input.length;i++) { h ^= input.charCodeAt(i); h = Math.imul(h,16777619); }
  return "fnv1a32-" + (h>>>0).toString(16).padStart(8,"0");
}

function duplicateIds(items) {
  const seen = new Set(), duplicates = [];
  for (const item of items || []) {
    if (seen.has(item.id)) duplicates.push(item.id);
    seen.add(item.id);
  }
  return duplicates;
}

export function validateCatalog(catalog) {
  const errors = [], warnings = [];
  if (!catalog?.catalogId || !catalog?.catalogVersion || !Array.isArray(catalog.capabilities)) errors.push("Catalog envelope or capabilities array is missing.");
  const items = catalog?.capabilities || [];
  for (const id of duplicateIds(items)) errors.push(`Duplicate capability id: ${id}`);
  const byId = new Map(items.map(x => [x.id,x]));
  const allowedLevels = new Set(["L1","L2","L3","L4","L5"]);
  for (const c of items) {
    if (!c.id || !c.name) errors.push("Capability requires id and name.");
    if (!allowedLevels.has(c.level)) errors.push(`${c.id}: unsupported level ${c.level}`);
    if (!APPLICABILITY.has(c.applicability)) errors.push(`${c.id}: invalid applicability state.`);
    if (c.parentId && !byId.has(c.parentId)) errors.push(`${c.id}: missing parent ${c.parentId}`);
    if (c.parentId && byId.has(c.parentId)) {
      const parent = byId.get(c.parentId);
      if (Number(parent.level.slice(1)) >= Number(c.level.slice(1))) errors.push(`${c.id}: parent level must be above child level.`);
    }
    if (c.status !== "accepted") warnings.push(`${c.id}: status is ${c.status || "unspecified"}; not treated as approved.`);
    if (c.applicability === "unassessed") warnings.push(`${c.id}: applicability remains unassessed.`);
  }
  // Parent-chain cycle detection.
  for (const c of items) {
    const path = new Set(); let current = c;
    while (current?.parentId) {
      if (path.has(current.id)) { errors.push(`Hierarchy cycle involving ${current.id}`); break; }
      path.add(current.id); current = byId.get(current.parentId);
    }
  }
  return {valid:errors.length===0, errors, warnings, counts:{capabilities:items.length,levels:[...new Set(items.map(x=>x.level))].sort()}};
}

export function validateTaxonomy(taxonomy) {
  const errors = [], warnings = [], nodes = taxonomy?.nodes || [];
  for (const id of duplicateIds(nodes)) errors.push(`Duplicate classification id: ${id}`);
  const byId = new Map(nodes.map(x=>[x.id,x]));
  for (const n of nodes) {
    if (!n.code || !n.name) errors.push(`${n.id}: code and name are required.`);
    if (n.parentId && !byId.has(n.parentId)) errors.push(`${n.id}: missing parent ${n.parentId}`);
    if (n.capabilityMappings) for (const m of n.capabilityMappings) {
      if (!MAPPING_TYPES.has(m.mappingType)) errors.push(`${n.id}: invalid mapping type ${m.mappingType}`);
      if (!APPLICABILITY.has(m.applicability)) errors.push(`${n.id}: invalid mapping applicability.`);
    }
    if (n.lifecycleState !== "accepted") warnings.push(`${n.id}: classification is ${n.lifecycleState}; proposed mappings are suggestions only.`);
  }
  for (const n of nodes) {
    const path = new Set(); let current=n;
    while (current?.parentId) {
      if (path.has(current.id)) { errors.push(`Taxonomy cycle involving ${current.id}`); break; }
      path.add(current.id); current=byId.get(current.parentId);
    }
  }
  return {valid:errors.length===0, errors, warnings, counts:{nodes:nodes.length,types:[...new Set(nodes.map(n=>n.classificationType))].sort()}};
}

export function buildCapabilityGraph(catalog, relationships=[]) {
  const nodes = new Map((catalog.capabilities||[]).map(c=>[c.id,{...c,nodeType:"capability"}]));
  const edges = [], errors=[];
  for (const c of catalog.capabilities||[]) if (c.parentId) edges.push({id:`hierarchy:${c.parentId}:${c.id}`,sourceId:c.parentId,predicate:"parentOf",targetId:c.id,lifecycleState:"derived"});
  for (const e of relationships) {
    if (!nodes.has(e.sourceId) || !nodes.has(e.targetId)) { errors.push(`${e.id}: dangling graph endpoint`); continue; }
    edges.push(e);
  }
  return {nodes:[...nodes.values()],edges,errors,counts:{nodes:nodes.size,edges:edges.length}};
}

export function resolveIndustryCrosswalk(taxonomy, catalog, classificationIds) {
  const nodeById = new Map((taxonomy.nodes||[]).map(n=>[n.id,n]));
  const capabilityById = new Map((catalog.capabilities||[]).map(c=>[c.id,c]));
  const selected = [...new Set(classificationIds||[])];
  const mappings=[], warnings=[], errors=[];
  for (const id of selected) {
    const node=nodeById.get(id);
    if (!node) { errors.push(`Unknown industry/context id: ${id}`); continue; }
    for (const m of node.capabilityMappings||[]) {
      if (!capabilityById.has(m.capabilityId)) { errors.push(`${id}: mapping references unknown capability ${m.capabilityId}`); continue; }
      mappings.push({classificationId:id,classificationName:node.name,...m,sourceLifecycle:node.lifecycleState});
      if (node.lifecycleState!=="accepted") warnings.push(`${id}: mapping ignored for authoritative composition until classification is accepted.`);
    }
  }
  return {mappings,warnings,errors};
}

export function composeEnterprise(request, {catalog,taxonomy,policy={version:"0.1.0",requireAcceptedCatalog:false}}) {
  const catalogCheck=validateCatalog(catalog), taxonomyCheck=validateTaxonomy(taxonomy);
  if (!catalogCheck.valid || !taxonomyCheck.valid) return {status:"failed",errors:[...catalogCheck.errors,...taxonomyCheck.errors]};
  if (policy.requireAcceptedCatalog && catalog.status!=="accepted") return {status:"failed",errors:["Catalog release is not accepted."]};
  if (!request?.tenantId || !request?.enterpriseId) return {status:"failed",errors:["tenantId and enterpriseId are required."]};
  if (!request.catalogVersion || request.catalogVersion!==catalog.catalogVersion) return {status:"failed",errors:["Catalog version must be explicitly pinned and match the loaded release."]};
  const crosswalk=resolveIndustryCrosswalk(taxonomy,catalog,request.classificationIds||[]);
  if (crosswalk.errors.length) return {status:"failed",errors:crosswalk.errors};
  const entries=new Map();
  for (const c of catalog.capabilities) {
    entries.set(c.id,{capabilityId:c.id,name:c.name,level:c.level,parentId:c.parentId,semanticStatus:c.status||"unspecified",applicability:c.applicability||"unassessed",lineage:[{type:"universal_catalog",id:catalog.catalogId,version:catalog.catalogVersion}],mappingDecisions:[]});
  }
  const reviewTasks=[];
  for (const m of crosswalk.mappings) {
    if (m.sourceLifecycle!=="accepted") continue;
    const base=entries.get(m.capabilityId);
    if (!base) continue;
    base.mappingDecisions.push({classificationId:m.classificationId,mappingType:m.mappingType,applicability:m.applicability,evidenceRefs:m.evidenceRefs||[]});
    base.lineage.push({type:"industry_classification",id:m.classificationId});
    if (m.applicability==="applicable" && base.applicability==="unassessed") base.applicability="applicable";
    else if (m.applicability==="conditional") {
      base.applicability="conditional";
      if (m.rationale) base.conditions=[...(base.conditions||[]),m.rationale];
    }
    if (m.applicability==="unassessed") reviewTasks.push({type:"applicability_assessment",capabilityId:m.capabilityId,classificationId:m.classificationId});
    if (m.mappingType==="replacement_proposal") reviewTasks.push({type:"replacement_review",capabilityId:m.capabilityId,classificationId:m.classificationId});
  }
  const context={classificationIds:[...(request.classificationIds||[])].sort(),businessModelIds:[...(request.businessModelIds||[])].sort(),productServiceIds:[...(request.productServiceIds||[])].sort(),jurisdictionIds:[...(request.jurisdictionIds||[])].sort()};
  const manifest={tenantId:request.tenantId,enterpriseId:request.enterpriseId,catalog:{id:catalog.catalogId,version:catalog.catalogVersion},taxonomy:{id:taxonomy.taxonomyId,version:taxonomy.version},policyVersion:policy.version,context,capabilities:[...entries.values()].sort((a,b)=>a.capabilityId.localeCompare(b.capabilityId))};
  const digest=fingerprint(manifest);
  return {compositionId:request.compositionId||`uece-${digest.slice(-8)}`,status:reviewTasks.length?"review_required":"draft",digest,manifest,reviewTasks,warnings:[...catalogCheck.warnings,...taxonomyCheck.warnings,...crosswalk.warnings],publicationEligible:false,publicationNote:"Prototype does not publish. Human approval and production policy enforcement are required."};
}


/**
 * Validate and resolve a proposed industry overlay without mutating the universal catalog.
 * The overlay is usable as a review candidate; acceptedOnly defaults to true for composition.
 */
export function validateIndustryOverlay(overlay, catalog) {
  const errors=[], warnings=[];
  const bases=new Map((catalog.capabilities||[]).map(c=>[c.id,c]));
  const overlays=overlay?.overlays||[];
  for (const id of duplicateIds(overlays)) errors.push(`Duplicate overlay id: ${id}`);
  for (const o of overlays) {
    const seen=new Set();
    for (const c of o.capabilities||[]) {
      if (seen.has(c.id)) errors.push(`${o.id}: duplicate capability id ${c.id}`);
      seen.add(c.id);
      if (bases.has(c.id)) errors.push(`${o.id}: overlay id collides with universal id ${c.id}`);
      if (!bases.has(c.parentId)) errors.push(`${c.id}: missing universal parent ${c.parentId}`);
      if (!bases.has(c.baseCapabilityId)) errors.push(`${c.id}: missing base capability ${c.baseCapabilityId}`);
      if (!APPLICABILITY.has(c.applicability)) errors.push(`${c.id}: invalid applicability`);
      if (!MAPPING_TYPES.has(c.mappingType)) errors.push(`${c.id}: invalid mapping type`);
      if (c.level==="L2" && bases.has(c.parentId) && bases.get(c.parentId).level!=="L1") errors.push(`${c.id}: L2 overlay must extend an L1 universal domain`);
      if (c.status!=="accepted" || o.status!=="accepted") warnings.push(`${c.id}: proposed overlay capability; excluded from accepted composition`);
    }
  }
  return {valid:errors.length===0,errors,warnings,counts:{overlays:overlays.length,capabilities:overlays.reduce((n,o)=>n+(o.capabilities||[]).length,0)}};
}

export function resolveIndustryOverlay(overlaySet, classificationId, catalog, {acceptedOnly=true}={}) {
  const check=validateIndustryOverlay(overlaySet,catalog);
  if (!check.valid) return {valid:false,errors:check.errors,capabilities:[],warnings:check.warnings};
  const overlay=(overlaySet.overlays||[]).find(o=>o.classificationId===classificationId);
  if (!overlay) return {valid:false,errors:[`No overlay found for ${classificationId}`],capabilities:[],warnings:[]};
  const capabilities=(overlay.capabilities||[]).filter(c=>!acceptedOnly || (overlay.status==="accepted" && c.status==="accepted"));
  const warnings=[...check.warnings];
  if (acceptedOnly && capabilities.length!==(overlay.capabilities||[]).length) warnings.push(`Overlay ${overlay.id} is proposed or contains proposed capabilities; no candidate records were promoted.`);
  return {valid:true,overlayId:overlay.id,overlayVersion:overlay.version,classificationId,capabilities:capabilities.map(c=>({...c,lineage:[...(c.lineage||[]),{type:"industry_overlay",id:overlay.id,version:overlay.version}]})),warnings};
}
