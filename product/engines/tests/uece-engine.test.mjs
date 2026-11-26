import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateCatalog,validateTaxonomy,buildCapabilityGraph,resolveIndustryCrosswalk,composeEnterprise,validateIndustryOverlay,resolveIndustryOverlay} from "../uece-intelligence-engine.mjs";

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

const overlaySet=JSON.parse(await readFile(new URL("capability-factory/data/industry-capability-overlays-v0.2.0.json",root),"utf8"));
test("six proposed industry overlays validate against universal parents",()=>{const r=validateIndustryOverlay(overlaySet,catalog);assert.equal(r.valid,true);assert.equal(r.counts.overlays,6);assert.equal(r.counts.capabilities,30);});
test("proposed overlay is not promoted by default",()=>{const r=resolveIndustryOverlay(overlaySet,"IND-BANK",catalog);assert.equal(r.valid,true);assert.equal(r.capabilities.length,0);assert.ok(r.warnings.length>0);});
test("overlay can be inspected in review mode without mutating base catalog",()=>{const before=catalog.capabilities.length;const r=resolveIndustryOverlay(overlaySet,"IND-BANK",catalog,{acceptedOnly:false});assert.equal(r.capabilities.length,5);assert.equal(catalog.capabilities.length,before);assert.equal(r.capabilities[0].applicability,"unassessed");});
test("unknown industry overlay is rejected",()=>{const r=resolveIndustryOverlay(overlaySet,"IND-UNKNOWN",catalog);assert.equal(r.valid,false);});

import {scoreCapabilityAssessment,analyzeCapabilityPortfolio,prioritizeCapabilityGaps,ASSESSMENT_DIMENSIONS} from "../uece-intelligence-engine.mjs";
const allScores=Object.fromEntries(ASSESSMENT_DIMENSIONS.map((d,i)=>[d,Math.min(5,Math.max(1,3+(i%3)-1))]));
test("assessment scoring excludes missing dimensions and computes evidence-backed average",()=>{const a={assessmentId:"A1",capabilityId:"U08",status:"validated",maturity:{dimensionScores:allScores,targetLevel:4},evidence:[{evidenceId:"E1"}]};const r=scoreCapabilityAssessment(a);assert.equal(r.status,"scored");assert.equal(r.dimensionCount,8);assert.equal(r.gap,1);});
test("insufficient evidence returns null maturity, not zero",()=>{const a={assessmentId:"A2",capabilityId:"U08",status:"in_progress",maturity:{dimensionScores:{strategy_outcomes:3}},evidence:[]};const r=scoreCapabilityAssessment(a);assert.equal(r.aggregateMaturity,null);assert.equal(r.status,"insufficient_evidence");});
test("invalid maturity dimension score is rejected",()=>{const r=scoreCapabilityAssessment({assessmentId:"A3",capabilityId:"U08",maturity:{dimensionScores:{strategy_outcomes:8}}});assert.equal(r.valid,false);});
test("portfolio reports coverage separately from maturity and excludes approved N/A",()=>{const caps=[{id:"U08",name:"Finance",level:"L1",applicability:"applicable"},{id:"U09",name:"People",level:"L1",applicability:"not_applicable"}];const a={assessmentId:"A4",capabilityId:"U08",status:"approved",assessedAt:"2026-01-01",maturity:{dimensionScores:allScores,targetLevel:4},evidence:[{evidenceId:"E1"}]};const r=analyzeCapabilityPortfolio({capabilities:caps,assessments:[a]});assert.equal(r.summary.assessmentCoverage,100);assert.equal(r.summary.excluded,1);assert.equal(r.summary.scoredCapabilities,1);});
test("gap prioritization only includes positive assessed gaps",()=>{const r=prioritizeCapabilityGaps([{capabilityId:"x",gap:2,criticality:2},{capabilityId:"y",gap:null},{capabilityId:"z",gap:0}]);assert.equal(r.length,1);assert.equal(r[0].priorityScore,2);});
