import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateCatalog,validateTaxonomy,buildCapabilityGraph,resolveIndustryCrosswalk,composeEnterprise} from "../uece-intelligence-engine.mjs";

const root=new URL("../../../",import.meta.url);
const catalog=JSON.parse(await readFile(new URL("capability-factory/data/universal-capability-catalog-v0.1.0.json",root),"utf8"));
const taxonomy=JSON.parse(await readFile(new URL("capability-factory/data/industry-classification-taxonomy-v0.1.0.json",root),"utf8"));

test("seed catalog passes structural and hierarchy checks",()=>{const r=validateCatalog(catalog);assert.equal(r.valid,true);assert.equal(r.counts.capabilities,27);});
test("seed taxonomy passes parent integrity checks",()=>{const r=validateTaxonomy(taxonomy);assert.equal(r.valid,true);assert.equal(r.counts.nodes,41);});
test("graph contains catalog nodes and derived hierarchy edges",()=>{const g=buildCapabilityGraph(catalog);assert.equal(g.nodes.length,27);assert.ok(g.edges.length>0);assert.deepEqual(g.errors,[]);});
test("proposed classifications do not create authoritative crosswalk mappings",()=>{const x=resolveIndustryCrosswalk(taxonomy,catalog,["IND-BANK"]);assert.equal(x.mappings.length,0);assert.ok(x.warnings.length>0);});
test("composition requires explicit pinned catalog release",()=>{const r=composeEnterprise({tenantId:"t",enterpriseId:"e"},{catalog,taxonomy});assert.equal(r.status,"failed");});
test("composition retains unassessed applicability and is deterministic",()=>{const req={tenantId:"t",enterpriseId:"e",catalogVersion:catalog.catalogVersion,classificationIds:["IND-BANK"]};const a=composeEnterprise(req,{catalog,taxonomy});const b=composeEnterprise(req,{catalog,taxonomy});assert.equal(a.digest,b.digest);assert.equal(a.manifest.capabilities.find(x=>x.capabilityId==="U08").applicability,"unassessed");});
test("duplicate capability IDs are rejected",()=>{const bad={...catalog,capabilities:[...catalog.capabilities,catalog.capabilities[0]]};assert.equal(validateCatalog(bad).valid,false);});
test("unknown classification context is rejected",()=>{const r=composeEnterprise({tenantId:"t",enterpriseId:"e",catalogVersion:catalog.catalogVersion,classificationIds:["NO-SUCH-ID"]},{catalog,taxonomy});assert.equal(r.status,"failed");});
