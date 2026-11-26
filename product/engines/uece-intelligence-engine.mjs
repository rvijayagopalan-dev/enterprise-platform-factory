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


export const MATURITY_LEVELS = Object.freeze({
  1:"Initial / Ad hoc",2:"Repeatable",3:"Defined",4:"Managed / Measured",5:"Optimizing"
});
export const ASSESSMENT_DIMENSIONS = Object.freeze([
  "strategy_outcomes","governance_accountability","process_operating_model","people_organization",
  "data_measurement","technology_automation","risk_security_compliance","continuous_improvement"
]);

/** Score only evidence-backed dimensions. Missing scores are never imputed. */
export function scoreCapabilityAssessment(assessment,{minimumDimensions=5}={}) {
  const errors=[], warnings=[];
  if (!assessment?.assessmentId || !assessment?.capabilityId) errors.push("assessmentId and capabilityId are required.");
  const scores=assessment?.maturity?.dimensionScores||{};
  const valid=[];
  for (const [dimension,score] of Object.entries(scores)) {
    if (!ASSESSMENT_DIMENSIONS.includes(dimension)) errors.push(`Unknown maturity dimension: ${dimension}`);
    else if (!Number.isInteger(score)||score<1||score>5) errors.push(`${dimension}: score must be an integer from 1 to 5.`);
    else valid.push(score);
  }
  const evidence=assessment?.evidence||[];
  if (!evidence.length) warnings.push("No evidence references supplied.");
  const coverage=valid.length/ASSESSMENT_DIMENSIONS.length;
  const enough=valid.length>=minimumDimensions;
  const aggregate=enough?Math.round((valid.reduce((a,b)=>a+b,0)/valid.length)*10)/10:null;
  const target=assessment?.maturity?.targetLevel;
  if (target!==undefined && (!Number.isInteger(target)||target<1||target>5)) errors.push("targetLevel must be an integer from 1 to 5.");
  const approved=assessment?.status==="approved"||assessment?.status==="validated";
  if (!approved) warnings.push("Assessment is not validated or approved; score is provisional.");
  if (evidence.length===0) warnings.push("Maturity scores require traceable evidence and assessor review.");
  return {valid:errors.length===0,errors,warnings,dimensionCount:valid.length,dimensionCoverage:Math.round(coverage*100),aggregateMaturity:enough?aggregate:null,
    maturityLabel:enough?(`Level ${Math.round(aggregate)} · ${MATURITY_LEVELS[Math.round(aggregate)]}`):"Insufficient evidence",
    targetLevel:target??null,gap:enough&&target!==undefined?Math.max(0,Math.round((target-aggregate)*10)/10):null,
    evidenceCount:evidence.length,confidence:assessment?.confidence??null,
    status:errors.length?"invalid":enough?"scored":"insufficient_evidence"};
}

export function analyzeCapabilityPortfolio({capabilities=[],assessments=[],applicability={},targetLevels={}}={}) {
  const latest=new Map();
  for (const a of assessments) {
    const prior=latest.get(a.capabilityId);
    if (!prior || String(a.assessedAt||"")>String(prior.assessedAt||"")) latest.set(a.capabilityId,a);
  }
  const rows=capabilities.map(c=>{
    const a=latest.get(c.id), scored=a?scoreCapabilityAssessment(a):null;
    const state=applicability[c.id]||c.applicability||"unassessed";
    const target=targetLevels[c.id]??a?.maturity?.targetLevel??null;
    const excluded=["not_applicable","externally_provided"].includes(state);
    return {capabilityId:c.id,name:c.name,level:c.level,applicability:state,assessmentStatus:a?.status||"not_started",
      maturity:scored?.aggregateMaturity??null,targetLevel:target,gap:scored?.aggregateMaturity!==null&&scored?.aggregateMaturity!==undefined&&target!==null?Math.max(0,Math.round((target-scored.aggregateMaturity)*10)/10):null,
      dimensionCoverage:scored?.dimensionCoverage??0,evidenceCount:scored?.evidenceCount??0,excludedFromInternalDenominator:excluded};
  });
  const denominator=rows.filter(r=>!r.excludedFromInternalDenominator&&r.applicability!=="unassessed");
  const assessed=denominator.filter(r=>r.assessmentStatus==="validated"||r.assessmentStatus==="approved");
  const scored=denominator.filter(r=>r.maturity!==null);
  const gaps=denominator.filter(r=>r.gap!==null).sort((a,b)=>b.gap-a.gap);
  const distribution={};
  for(let i=1;i<=5;i++)distribution[i]=scored.filter(r=>Math.round(r.maturity)===i).length;
  return {summary:{totalCapabilities:rows.length,applicableDenominator:denominator.length,validatedAssessments:assessed.length,
    assessmentCoverage:denominator.length?Math.round(assessed.length/denominator.length*100):null,
    scoredCapabilities:scored.length,averageMaturity:scored.length?Math.round(scored.reduce((s,r)=>s+r.maturity,0)/scored.length*10)/10:null,
    unassessed:rows.filter(r=>r.applicability==="unassessed"||r.assessmentStatus==="not_started").length,
    excluded:rows.filter(r=>r.excludedFromInternalDenominator).length,distribution},
    gapRegister:gaps,capabilities:rows};
}

export function prioritizeCapabilityGaps(items=[]) {
  return items.filter(x=>x.gap!==null&&x.gap>0).map(x=>({...x,priorityScore:Math.round((x.gap*(x.criticality??1)*(x.strategicValue??1)*(x.riskExposure??1))*100)/100}))
    .sort((a,b)=>b.priorityScore-a.priorityScore);
}


// UECE v0.4.0 — typed enterprise architecture graph and realization intelligence.
export const ARCHITECTURE_NODE_TYPES = Object.freeze(["capability","process","role","application","data","technology","product","risk","control","factory","agent","objective","metric","investment"]);
export const ARCHITECTURE_PREDICATES = Object.freeze(["realizedByProcess","ownedByRole","supportedByApplication","usesData","runsOnTechnology","enablesProduct","mitigatedByControl","exposedToRisk","deliveredByFactory","orchestratedByAgent","dependsOn","enables","measures","governedBy"]);
export const REALIZATION_MODES = Object.freeze(["build","improve","buy","partner","automate","orchestrate","retire","not_decided"]);
const REALIZATION_DIMENSIONS = Object.freeze(["process","role","application","data","technology","risk_control","product_outcome","factory_agent"]);
const PREDICATE_DIMENSION = Object.freeze({realizedByProcess:"process",ownedByRole:"role",supportedByApplication:"application",usesData:"data",runsOnTechnology:"technology",enablesProduct:"product_outcome",mitigatedByControl:"risk_control",exposedToRisk:"risk_control",deliveredByFactory:"factory_agent",orchestratedByAgent:"factory_agent"});

export function validateArchitectureGraph(graph) {
  const errors=[],warnings=[];
  if (!graph?.graphId || !Array.isArray(graph.nodes) || !Array.isArray(graph.relationships)) errors.push("Graph envelope, nodes and relationships are required.");
  const nodes=graph?.nodes||[], edges=graph?.relationships||[];
  const nodeIds=new Set(), edgeIds=new Set(), nodeById=new Map();
  for(const n of nodes){
    if(!n.id||!n.nodeType||!ARCHITECTURE_NODE_TYPES.includes(n.nodeType)) errors.push("Each graph node requires an ID and supported nodeType.");
    if(nodeIds.has(n.id)) errors.push("Duplicate graph node ID: "+n.id);
    nodeIds.add(n.id); nodeById.set(n.id,n);
  }
  for(const e of edges){
    if(!e.relationshipId||edgeIds.has(e.relationshipId)) errors.push("Missing or duplicate relationship ID: "+(e.relationshipId||"unknown"));
    edgeIds.add(e.relationshipId);
    if(!ARCHITECTURE_PREDICATES.includes(e.predicate)) errors.push((e.relationshipId||"edge")+": unsupported predicate.");
    if(!["proposed","in_review","accepted","rejected","deprecated"].includes(e.lifecycleState)) errors.push((e.relationshipId||"edge")+": invalid lifecycleState.");
    if(!e.provenance?.sourceType||!e.provenance?.sourceRef) errors.push((e.relationshipId||"edge")+": provenance is required.");
    if(e.confidence!==undefined&&(!Number.isFinite(e.confidence)||e.confidence<0||e.confidence>1)) errors.push((e.relationshipId||"edge")+": confidence must be between 0 and 1.");
    for(const side of ["source","target"]){
      const endpoint=e[side], actual=endpoint&&nodeById.get(endpoint.nodeId);
      if(!endpoint?.nodeId||!endpoint?.nodeType) errors.push((e.relationshipId||"edge")+": "+side+" endpoint is incomplete.");
      else if(!actual) errors.push((e.relationshipId||"edge")+": dangling "+side+" endpoint "+endpoint.nodeId+".");
      else if(actual.nodeType!==endpoint.nodeType) errors.push((e.relationshipId||"edge")+": "+side+" endpoint type mismatch for "+endpoint.nodeId+".");
    }
    if(e.lifecycleState!=="accepted") warnings.push((e.relationshipId||"edge")+": relationship is "+e.lifecycleState+" and excluded from authoritative traceability.");
  }
  return {valid:errors.length===0,errors,warnings,counts:{nodes:nodes.length,relationships:edges.length,acceptedRelationships:edges.filter(e=>e.lifecycleState==="accepted").length,proposedRelationships:edges.filter(e=>e.lifecycleState==="proposed"||e.lifecycleState==="in_review").length}};
}

export function traceCapability(graph,capabilityId,{acceptedOnly=false}={}) {
  const check=validateArchitectureGraph(graph);
  if(!check.valid) return {valid:false,errors:check.errors,capabilityId,relationships:[]};
  const node=(graph.nodes||[]).find(n=>n.id===capabilityId&&n.nodeType==="capability");
  if(!node) return {valid:false,errors:["Unknown capability: "+capabilityId],capabilityId,relationships:[]};
  const relationships=(graph.relationships||[]).filter(e=>(e.source.nodeType==="capability"&&e.source.nodeId===capabilityId)||(e.target.nodeType==="capability"&&e.target.nodeId===capabilityId))
    .filter(e=>!acceptedOnly||e.lifecycleState==="accepted");
  return {valid:true,capabilityId,name:node.name,relationships,acceptedCount:relationships.filter(e=>e.lifecycleState==="accepted").length,candidateCount:relationships.filter(e=>e.lifecycleState!=="accepted").length};
}

export function analyzeRealizationPortfolio({capabilities=[],graph={nodes:[],relationships:[]},realizations=[],requiredDimensions=REALIZATION_DIMENSIONS}={}) {
  const graphCheck=validateArchitectureGraph(graph);
  if(!graphCheck.valid) return {valid:false,errors:graphCheck.errors,summary:null,capabilities:[],gapRegister:[]};
  const rows=capabilities.map(c=>{
    const links=(graph.relationships||[]).filter(e=>e.source.nodeType==="capability"&&e.source.nodeId===c.id);
    const accepted=links.filter(e=>e.lifecycleState==="accepted");
    const covered=new Set(accepted.map(e=>PREDICATE_DIMENSION[e.predicate]).filter(Boolean));
    const evidenceCovered=new Set(accepted.filter(e=>(e.evidenceRefs||[]).length>0).map(e=>PREDICATE_DIMENSION[e.predicate]).filter(Boolean));
    const decisions=realizations.filter(r=>r.capabilityId===c.id);
    const current=decisions.slice().sort((a,b)=>String(b.updatedAt||b.createdAt||"").localeCompare(String(a.updatedAt||a.createdAt||"")))[0]||null;
    const missing=requiredDimensions.filter(d=>!covered.has(d));
    return {capabilityId:c.id,name:c.name,level:c.level||null,relationshipCount:links.length,acceptedRelationshipCount:accepted.length,candidateRelationshipCount:links.length-accepted.length,
      coveredDimensions:[...covered],evidenceCoveredDimensions:[...evidenceCovered],requiredDimensionCount:requiredDimensions.length,coveredDimensionCount:covered.size,
      traceabilityCoverage:requiredDimensions.length?Math.round(requiredDimensions.filter(d=>covered.has(d)).length/requiredDimensions.length*100):100,
      evidenceCoverage:requiredDimensions.length?Math.round(requiredDimensions.filter(d=>evidenceCovered.has(d)).length/requiredDimensions.length*100):100,
      missingDimensions:missing,realizationMode:current?.realizationMode||"not_decided",realizationStatus:current?.status||"not_decided",realizationId:current?.realizationId||null};
  });
  const gapRegister=rows.filter(r=>r.missingDimensions.length||r.realizationMode==="not_decided").sort((a,b)=>b.missingDimensions.length-a.missingDimensions.length||a.name.localeCompare(b.name));
  const total=rows.length, acceptedLinks=rows.reduce((s,r)=>s+r.acceptedRelationshipCount,0);
  return {valid:true,errors:[],summary:{capabilityCount:total,capabilitiesWithAcceptedLinks:rows.filter(r=>r.acceptedRelationshipCount>0).length,
    averageTraceabilityCoverage:total?Math.round(rows.reduce((s,r)=>s+r.traceabilityCoverage,0)/total):null,
    averageEvidenceCoverage:total?Math.round(rows.reduce((s,r)=>s+r.evidenceCoverage,0)/total):null,
    acceptedRelationshipCount:acceptedLinks,proposedRelationshipCount:rows.reduce((s,r)=>s+r.candidateRelationshipCount,0),
    capabilitiesWithoutRealizationDecision:rows.filter(r=>r.realizationMode==="not_decided").length,gapCount:gapRegister.length},
    capabilities:rows,gapRegister};
}


// UECE v0.5.0 — strategy-to-outcome traceability and dependency impact.
export function analyzeStrategicTraceability(graph,{objectiveIds=[]}={}) {
  const check=validateArchitectureGraph(graph);
  if(!check.valid) return {valid:false,errors:check.errors,objectives:[],summary:null};
  const accepted=(graph.relationships||[]).filter(e=>e.lifecycleState==="accepted");
  const objectives=(graph.nodes||[]).filter(n=>n.nodeType==="objective"&&(!objectiveIds.length||objectiveIds.includes(n.id)));
  const results=objectives.map(o=>{
    const capabilityIds=accepted.filter(e=>e.source.nodeType==="objective"&&e.source.nodeId===o.id&&e.predicate==="enables"&&e.target.nodeType==="capability").map(e=>e.target.nodeId);
    const capabilities=capabilityIds.map(id=>{
      const c=(graph.nodes||[]).find(n=>n.id===id);
      const metrics=accepted.filter(e=>e.source.nodeType==="capability"&&e.source.nodeId===id&&e.predicate==="measures").map(e=>({metricId:e.target.nodeId,metricName:(graph.nodes||[]).find(n=>n.id===e.target.nodeId)?.name||e.target.nodeId}));
      return {capabilityId:id,capabilityName:c?.name||id,metrics};
    });
    return {objectiveId:o.id,objectiveName:o.name,capabilities,capabilityCount:capabilities.length,measuredCapabilityCount:capabilities.filter(c=>c.metrics.length).length};
  });
  return {valid:true,objectives:results,summary:{objectiveCount:results.length,objectivesWithCapabilityLinks:results.filter(o=>o.capabilityCount>0).length,capabilityLinks:results.reduce((s,o)=>s+o.capabilityCount,0),measuredCapabilityLinks:results.reduce((s,o)=>s+o.measuredCapabilityCount,0)}};
}

export function analyzeDependencyImpact(graph,changedNodeId,{acceptedOnly=true}={}) {
  const check=validateArchitectureGraph(graph);
  if(!check.valid) return {valid:false,errors:check.errors,changedNodeId,affectedNodes:[],cycles:[]};
  const nodes=new Map((graph.nodes||[]).map(n=>[n.id,n]));
  if(!nodes.has(changedNodeId)) return {valid:false,errors:["Unknown changed node: "+changedNodeId],changedNodeId,affectedNodes:[],cycles:[]};
  const edges=(graph.relationships||[]).filter(e=>e.predicate==="dependsOn"&&(!acceptedOnly||e.lifecycleState==="accepted"));
  // source depends on target: a change to target impacts source, so traverse reverse dependency edges.
  const reverse=new Map();
  for(const e of edges){if(!reverse.has(e.target.nodeId))reverse.set(e.target.nodeId,[]);reverse.get(e.target.nodeId).push(e.source.nodeId);}
  const visited=new Set([changedNodeId]),queue=[changedNodeId],affected=[];
  while(queue.length){const current=queue.shift();for(const dependent of reverse.get(current)||[]){if(!visited.has(dependent)){visited.add(dependent);queue.push(dependent);affected.push(dependent);}}}
  const cycles=[],state=new Map(),stack=[];
  function visit(id){
    if(state.get(id)===1){const start=stack.indexOf(id);cycles.push(stack.slice(start).concat(id));return;}
    if(state.get(id)===2)return;
    state.set(id,1);stack.push(id);
    for(const e of edges.filter(x=>x.source.nodeId===id))visit(e.target.nodeId);
    stack.pop();state.set(id,2);
  }
  for(const id of nodes.keys())if(!state.has(id))visit(id);
  return {valid:true,changedNodeId,affectedNodes:affected.map(id=>({nodeId:id,nodeType:nodes.get(id).nodeType,name:nodes.get(id).name||id})),affectedCount:affected.length,cycles,cycleCount:cycles.length,dependencyEdgeCount:edges.length};
}


// UECE v0.6 — deterministic investment scenario and portfolio analysis.
export function analyzeInvestmentScenario(scenario,{portfolioCapabilities=[]}={}) {
  const errors=[],warnings=[];
  if(!scenario?.scenarioId||!scenario?.tenantId||!scenario?.enterpriseId)errors.push("Scenario identity and tenant scope are required.");
  if(!/^[A-Z]{3}$/.test(scenario?.currency||""))errors.push("A three-letter ISO currency code is required.");
  const ids=new Set(),known=new Set(portfolioCapabilities.map(c=>c.id));
  for(const d of scenario?.decisions||[]){
    if(ids.has(d.capabilityId))errors.push("Duplicate decision for capability "+d.capabilityId);ids.add(d.capabilityId);
    if(!REALIZATION_MODES.includes(d.mode))errors.push(d.capabilityId+": invalid realization mode.");
    for(const k of ["cost","expectedValue","riskScore"])if(!Number.isFinite(d[k])||d[k]<0)errors.push(d.capabilityId+": "+k+" must be non-negative.");
    if(d.riskScore>5)errors.push(d.capabilityId+": riskScore cannot exceed 5.");
    if(known.size&&!known.has(d.capabilityId))errors.push("Unknown capability "+d.capabilityId);
    if(d.confidence!==undefined&&(!Number.isFinite(d.confidence)||d.confidence<0||d.confidence>1))errors.push(d.capabilityId+": confidence must be between 0 and 1.");
  }
  const decisions=scenario?.decisions||[],budget=scenario?.constraints?.budgetCeiling??null;
  const totalCost=decisions.reduce((s,d)=>s+(Number(d.cost)||0),0),expectedValue=decisions.reduce((s,d)=>s+(Number(d.expectedValue)||0),0);
  if(budget!==null&&totalCost>budget)warnings.push("Full scenario exceeds the budget ceiling.");
  const maxRisk=scenario?.constraints?.maxRiskScore??5;
  const eligible=decisions.filter(d=>d.riskScore<=maxRisk);
  const required=scenario?.constraints?.requiredCapabilities||[];
  const missingRequired=required.filter(id=>!decisions.some(d=>d.capabilityId===id));
  return {valid:errors.length===0,errors,warnings,scenarioId:scenario?.scenarioId,currency:scenario?.currency,period:scenario?.period,
    summary:{decisionCount:decisions.length,totalCost,expectedValue,netExpectedValue:expectedValue-totalCost,averageRisk:decisions.length?decisions.reduce((s,d)=>s+d.riskScore,0)/decisions.length:null,
      budgetCeiling:budget,budgetVariance:budget===null?null:budget-totalCost,eligibleUnderRiskLimit:eligible.length,missingRequiredCapabilities:missingRequired}};
}

export function optimizeInvestmentPortfolio(scenario,{budget=scenario?.constraints?.budgetCeiling??Infinity,maxRisk=scenario?.constraints?.maxRiskScore??5}={}) {
  const valid=analyzeInvestmentScenario(scenario);
  if(!valid.valid)return {valid:false,errors:valid.errors,selected:[],unfunded:[],summary:null};
  const decisions=scenario.decisions,required=new Set(scenario.constraints?.requiredCapabilities||[]);
  const candidates=decisions.filter(d=>d.riskScore<=maxRisk);
  const missingRequired=[...required].filter(id=>!candidates.some(d=>d.capabilityId===id));
  if(missingRequired.length)return {valid:false,errors:["Required capabilities are absent or exceed the risk limit: "+missingRequired.join(", ")],selected:[],unfunded:decisions,summary:null};
  const mandatory=candidates.filter(d=>required.has(d.capabilityId)),optional=candidates.filter(d=>!required.has(d.capabilityId));
  const mandatoryCost=mandatory.reduce((s,d)=>s+d.cost,0);
  if(mandatoryCost>budget)return {valid:false,errors:["Required capability decisions exceed the available budget."],selected:[],unfunded:candidates,summary:null};
  const ranked=optional.map(d=>({...d,decisionScore:Math.round(((d.expectedValue/(d.cost||1))*(d.confidence??0.7)*(1-d.riskScore/10))*10000)/10000}))
    .sort((a,b)=>b.decisionScore-a.decisionScore||a.capabilityId.localeCompare(b.capabilityId));
  const selected=[...mandatory],unfunded=[];let remaining=budget-mandatoryCost;
  for(const d of ranked){if(d.cost<=remaining){selected.push(d);remaining-=d.cost;}else unfunded.push(d);}
  const riskExcluded=decisions.filter(d=>d.riskScore>maxRisk);
  const cost=selected.reduce((s,d)=>s+d.cost,0),value=selected.reduce((s,d)=>s+d.expectedValue,0);
  return {valid:true,errors:[],selected:selected.map(({decisionScore,...d})=>d),unfunded:[...unfunded,...riskExcluded],
    summary:{currency:scenario.currency,budget,allocated:cost,remaining,expectedValue:value,netExpectedValue:value-cost,selectedCount:selected.length,unfundedCount:unfunded.length,riskExcludedCount:riskExcluded.length,selectionMethod:"mandatory inclusion then deterministic value-cost-confidence-risk heuristic; not a global optimum"}};
}

// UECE v0.7 — factory/agent realization validation and coverage.
export function validateFactoryAgentRealizations(records,{capabilities=[],providers=[]}={}) {
  const errors=[],warnings=[],ids=new Set(),capIds=new Set(capabilities.map(c=>c.id)),providerMap=new Map(providers.map(p=>[p.id,p]));
  for(const r of records||[]){
    if(!r.realizationId||ids.has(r.realizationId))errors.push("Missing or duplicate realizationId: "+(r.realizationId||"unknown"));ids.add(r.realizationId);
    if(capIds.size&&!capIds.has(r.capabilityId))errors.push(r.realizationId+": unknown capability "+r.capabilityId);
    const p=providerMap.get(r.providerId);
    if(providerMap.size&&(!p||p.nodeType!==r.providerType))errors.push(r.realizationId+": provider reference missing or type mismatch.");
    if(!["factory","agent","human_team","external_service","platform_product"].includes(r.providerType))errors.push(r.realizationId+": invalid providerType.");
    if(!["proposed","approved","pilot","production","suspended","retired"].includes(r.lifecycleState))errors.push(r.realizationId+": invalid lifecycleState.");
    if(!r.humanOversight||typeof r.humanOversight.required!=="boolean"||!r.humanOversight.escalationPath)errors.push(r.realizationId+": human oversight and escalation path are required.");
    if(r.executionMode==="autonomous_bounded"&&!r.humanOversight.required)errors.push(r.realizationId+": bounded autonomy requires a human escalation/oversight path.");
    if(r.lifecycleState==="production"&&(!Array.isArray(r.controls)||!r.controls.length))warnings.push(r.realizationId+": production realization has no linked controls.");
  }
  return {valid:errors.length===0,errors,warnings,counts:{realizations:(records||[]).length,production:(records||[]).filter(r=>r.lifecycleState==="production").length}};
}

export function analyzeFactoryAgentCoverage({capabilities=[],realizations=[]}={}) {
  const rows=capabilities.map(c=>{const linked=realizations.filter(r=>r.capabilityId===c.id&&["approved","pilot","production"].includes(r.lifecycleState));
    return {capabilityId:c.id,name:c.name,providerCount:linked.length,providers:linked.map(r=>({providerType:r.providerType,providerId:r.providerId,lifecycleState:r.lifecycleState,executionMode:r.executionMode})),realized:linked.some(r=>r.lifecycleState==="production")};});
  return {summary:{capabilityCount:rows.length,withApprovedOrPilotProvider:rows.filter(r=>r.providerCount>0).length,withProductionProvider:rows.filter(r=>r.realized).length,withoutProvider:rows.filter(r=>r.providerCount===0).length},capabilities:rows};
}

// UECE v0.8 — assurance and publication gates.
export function evaluateGovernanceAssurance({records=[],requiredControlIds=[],subjectId=null}={}) {
  const scoped=records.filter(r=>subjectId===null||r.subjectId===subjectId),byControl=new Map(scoped.map(r=>[r.controlId,r]));
  const missing=requiredControlIds.filter(id=>!byControl.has(id)),ineffective=scoped.filter(r=>["ineffective","partially_effective","not_assessed"].includes(r.status));
  const exceptions=scoped.filter(r=>r.status==="exception_approved"&&r.approval?.approvedBy&&r.approval?.approvedAt);
  const effective=scoped.filter(r=>r.status==="effective"&&r.evidenceRefs?.length);
  const blockers=[...missing.map(id=>"Missing required control "+id),...ineffective.map(r=>"Control "+r.controlId+" status "+r.status),...scoped.filter(r=>r.status==="effective"&&!r.evidenceRefs?.length).map(r=>"Control "+r.controlId+" has no evidence references")];
  return {ready:blockers.length===0,blockers,warnings:exceptions.length?["Approved exceptions exist and require expiry/periodic review."]:[],summary:{records:scoped.length,requiredControls:requiredControlIds.length,missingControls:missing.length,evidenceBackedEffective:effective.length,approvedExceptions:exceptions.length}};
}

export function createGovernedPlatformRelease({tenantId,enterpriseId,releaseVersion,catalogRef,graph,policyVersion,createdBy,governanceRecords=[],requiredControlIds=[],parentReleaseId=null,changeSummary=""}={}) {
  const graphCheck=validateArchitectureGraph(graph||{});
  const assurance=evaluateGovernanceAssurance({records:governanceRecords,requiredControlIds});
  const errors=[];
  for(const [k,v] of Object.entries({tenantId,enterpriseId,releaseVersion,policyVersion,createdBy}))if(!v)errors.push(k+" is required.");
  if(!catalogRef?.id||!catalogRef?.version)errors.push("Pinned catalogRef id and version are required.");
  if(!graphCheck.valid)errors.push(...graphCheck.errors);
  if(!assurance.ready)errors.push(...assurance.blockers);
  const manifest={tenantId,enterpriseId,releaseVersion,catalogRef,graph:{id:graph.graphId,version:graph.version,nodes:graph.nodes,relationships:graph.relationships},policyVersion,governanceRecords,requiredControlIds:[...requiredControlIds].sort(),parentReleaseId,changeSummary};
  const digest=fingerprint(manifest);
  const release={releaseId:"uece-release-"+digest.slice(-10),tenantId,enterpriseId,releaseVersion,catalogRef,graphRef:{id:graph?.graphId||"invalid",version:graph?.version||"unknown"},policyVersion,status:errors.length?"draft":"in_review",createdAt:"caller-supplied-at-publication",createdBy,digest,parentReleaseId,changeSummary};
  return {valid:errors.length===0,errors,assurance,graphCheck,release,publicationAllowed:false,note:"Prototype never publishes. A separate authenticated approval action and immutable persistence transaction are required."};
}

// UECE v0.9 — integrated workbench projection.
export function buildEnterpriseIntelligenceWorkbench({capabilities=[],assessments=[],graph={nodes:[],relationships:[]},realizations=[],factoryAgentRealizations=[],governanceRecords=[],requiredControlIds=[],investmentScenario=null}={}) {
  const maturity=analyzeCapabilityPortfolio({capabilities,assessments});
  const realization=analyzeRealizationPortfolio({capabilities,graph,realizations});
  const factory=analyzeFactoryAgentCoverage({capabilities,realizations:factoryAgentRealizations});
  const assurance=evaluateGovernanceAssurance({records:governanceRecords,requiredControlIds});
  const investment=investmentScenario?analyzeInvestmentScenario(investmentScenario,{portfolioCapabilities:capabilities}):null;
  return {status:realization.valid&&(!investment||investment.valid)?"available":"degraded",summary:{capabilities:capabilities.length,maturityCoverage:maturity.summary.assessmentCoverage,averageMaturity:maturity.summary.averageMaturity,architectureTraceability:realization.summary.averageTraceabilityCoverage,factoryAgentProductionCoverage:factory.summary.capabilityCount?Math.round(factory.summary.withProductionProvider/factory.summary.capabilityCount*100):null,governanceReady:assurance.ready,investmentNetValue:investment?.summary?.netExpectedValue??null},
    maturity,realization,factory,assurance,investment,limitations:["In-memory prototype; not a tenant-isolated service.","Evidence references are not dereferenced or cryptographically verified.","No live authorization, approvals, persistence or workflow orchestration."]};
}
