import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateArchitectureGraph,traceCapability,analyzeRealizationPortfolio} from "../uece-intelligence-engine.mjs";

const root=new URL("../../../",import.meta.url);
const graph=JSON.parse(await readFile(new URL("capability-factory/data/enterprise-architecture-graph-seed-v0.4.0.json",root),"utf8"));
const capabilities=graph.nodes.filter(n=>n.nodeType==="capability");

test("illustrative graph has valid typed endpoints and provenance",()=>{
 const r=validateArchitectureGraph(graph);assert.equal(r.valid,true);assert.equal(r.counts.nodes,27);assert.equal(r.counts.relationships,13);
});
test("proposed graph relationships are not authoritative traceability",()=>{
 const r=traceCapability(graph,"U02",{acceptedOnly:true});assert.equal(r.valid,true);assert.equal(r.relationships.length,0);
 const all=traceCapability(graph,"U02");assert.equal(all.relationships.length,11);assert.equal(all.candidateCount,11);
});
test("dangling endpoint is rejected",()=>{
 const bad=structuredClone(graph);bad.relationships[0].target.nodeId="MISSING";assert.equal(validateArchitectureGraph(bad).valid,false);
});
test("endpoint type mismatch is rejected",()=>{
 const bad=structuredClone(graph);bad.relationships[0].target.nodeType="application";assert.equal(validateArchitectureGraph(bad).valid,false);
});
test("realization coverage counts accepted edges only and surfaces gaps",()=>{
 const accepted=structuredClone(graph);accepted.relationships=accepted.relationships.map(e=>({...e,lifecycleState:"accepted",evidenceRefs:["evidence://sample"]}));
 const r=analyzeRealizationPortfolio({capabilities,graph:accepted,realizations:[{realizationId:"R1",capabilityId:"U02",realizationMode:"improve",status:"planned"}]});
 assert.equal(r.valid,true);const row=r.capabilities.find(x=>x.capabilityId==="U02");assert.equal(row.traceabilityCoverage,88);assert.equal(row.evidenceCoverage,88);assert.equal(row.realizationMode,"improve");
});
test("candidate edges do not inflate traceability coverage",()=>{
 const r=analyzeRealizationPortfolio({capabilities,graph});assert.equal(r.valid,true);assert.equal(r.summary.averageTraceabilityCoverage,0);assert.equal(r.summary.proposedRelationshipCount,13);
});
