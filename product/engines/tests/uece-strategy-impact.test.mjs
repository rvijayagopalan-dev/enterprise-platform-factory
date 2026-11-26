import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {analyzeStrategicTraceability,analyzeDependencyImpact} from "../uece-intelligence-engine.mjs";
const root=new URL("../../../",import.meta.url);
const seed=JSON.parse(await readFile(new URL("capability-factory/data/enterprise-architecture-graph-seed-v0.4.0.json",root),"utf8"));
const accepted=()=>({...structuredClone(seed),relationships:seed.relationships.map(e=>({...e,lifecycleState:"accepted"}))});
test("strategy trace connects objectives to capabilities and outcome metrics",()=>{
 const graph=accepted();const r=analyzeStrategicTraceability(graph);
 assert.equal(r.valid,true);assert.equal(r.summary.objectivesWithCapabilityLinks,1);assert.equal(r.summary.measuredCapabilityLinks,1);
});
test("strategy trace ignores proposed objective links",()=>{
 const r=analyzeStrategicTraceability(seed);assert.equal(r.summary.objectivesWithCapabilityLinks,0);
});
test("dependency impact traverses reverse dependency direction",()=>{
 const graph=accepted();graph.relationships.push(
 {relationshipId:"dep-1",source:{nodeType:"capability",nodeId:"U02"},predicate:"dependsOn",target:{nodeType:"application",nodeId:"APP-CRM-01"},lifecycleState:"accepted",provenance:{sourceType:"workshop",sourceRef:"test"}},
 {relationshipId:"dep-2",source:{nodeType:"capability",nodeId:"U03"},predicate:"dependsOn",target:{nodeType:"capability",nodeId:"U02"},lifecycleState:"accepted",provenance:{sourceType:"workshop",sourceRef:"test"}}
 );
 const r=analyzeDependencyImpact(graph,"APP-CRM-01");assert.equal(r.valid,true);assert.equal(r.affectedCount,2);assert.deepEqual(r.affectedNodes.map(x=>x.nodeId),["U02","U03"]);
});
test("dependency cycles are surfaced instead of hidden",()=>{
 const graph=accepted();graph.relationships.push(
 {relationshipId:"dep-3",source:{nodeType:"capability",nodeId:"U02"},predicate:"dependsOn",target:{nodeType:"capability",nodeId:"U03"},lifecycleState:"accepted",provenance:{sourceType:"workshop",sourceRef:"test"}},
 {relationshipId:"dep-4",source:{nodeType:"capability",nodeId:"U03"},predicate:"dependsOn",target:{nodeType:"capability",nodeId:"U02"},lifecycleState:"accepted",provenance:{sourceType:"workshop",sourceRef:"test"}}
 );
 const r=analyzeDependencyImpact(graph,"U02");assert.ok(r.cycleCount>0);
});
