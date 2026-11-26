# Enterprise Capability Composition Engine — Specification

**Version:** 0.1.0-draft  
**Status:** Proposed implementation contract  
**Owner:** Capability Factory  
**Platform:** EPF services; EMF consumes published compositions

## Purpose
Resolve a reproducible enterprise capability baseline from a version-pinned universal catalog, industry/sub-industry overlays, business-model overlays, product/service context, geography/jurisdiction and approved enterprise extensions.

## Inputs
- Enterprise and tenant scope.
- Primary and secondary industry/sub-industry IDs.
- Business-model, product/service, geography and jurisdiction context IDs.
- Operating-model and sourcing-mode context.
- Universal catalog release and overlay release IDs.
- Approved enterprise extension IDs and explicit applicability decisions.
- Resolution policy version.

All catalog and policy versions are immutable references. Missing pinned versions must be rejected or resolved to an explicitly recorded release before execution.

## Resolution algorithm
1. Validate tenant authorization, catalog releases and context identifiers.
2. Normalize context identifiers and deduplicate selected contexts.
3. Load universal capability candidates from the pinned release.
4. Load industry and sub-industry mappings, preserving source and lineage.
5. Load business-model, product/service, geography and jurisdiction overlays.
6. Apply only approved mappings and explicit applicability assertions.
7. Preserve missing or ambiguous applicability as unassessed; conditional entries retain conditions.
8. Add approved enterprise extensions and preserve base-capability lineage.
9. Resolve reuse, specialization, extension, addition, alias and replacement proposal semantics.
10. Deduplicate only where canonical identity or approved semantic equivalence establishes identity. Similar names are insufficient.
11. Resolve dependency, enablement, overlap and supersession edges; detect prohibited hierarchy cycles and dangling references.
12. Produce conflict, missing-evidence and review queues. Do not auto-resolve semantic conflicts.
13. Generate deterministic ordering, manifest and content digest from normalized inputs and accepted decisions.
14. Persist immutable candidate snapshot; publish only after required human approvals.

## Determinism and invariants
- Identical normalized inputs, pinned releases, policy version and accepted decisions produce identical membership, ordering and digest.
- No truncation by array position, rank or arbitrary count.
- No implicit applicability defaults.
- No mutation of universal definitions by industry overlays.
- No silent replacement of a capability.
- No name-only deduplication.
- Every item carries source catalog, source version, mapping decision and lineage.
- Unresolved conflicts remain visible and block publication when policy marks them blocking.
- Composition is tenant-scoped and authorization-checked.
- Published manifests are immutable; changes create a new composition version.

## Mapping semantics
| Mapping | Resolution |
|---|---|
| reuse | Include canonical base capability once; append context applicability assertion |
| specialization | Include specialized definition with specializes edge to base |
| extension | Include extension with lineage; base remains addressable |
| addition | Include new contextual capability under a valid contextual parent |
| alias | Resolve alias to canonical identity; preserve alias provenance |
| replacement proposal | Keep base active; create review item; do not replace before approval |

## Output contract
Composition result contains composition ID, tenant, enterprise, status, pinned catalog/overlay/policy versions, normalized context, capability entries with applicability and lineage, typed graph edges, conflicts and warnings, review tasks, deterministic manifest digest, actor and audit references.

Statuses: draft, resolving, review_required, approved, published, failed, superseded.

## Reference pseudocode
    compose(request):
      authorize(request.tenant, request.enterprise)
      releases = resolve_and_pin_releases(request.catalogRefs)
      contexts = normalize_context(request.context)
      candidates = load_universal(releases.universal)
      for overlay in load_overlays(contexts, releases):
          candidates += apply_explicit_mappings(overlay, candidates)
      candidates += load_approved_enterprise_extensions(request.extensions)
      candidates = resolve_aliases(candidates)
      candidates = deduplicate_by_canonical_identity(candidates)
      edges = load_accepted_relationships(candidates, releases)
      validate_references(candidates, edges)
      validate_hierarchy_acyclic(edges)
      conflicts = detect_semantic_conflicts(candidates, edges)
      applicability = preserve_explicit_states(candidates, contexts)
      review = build_review_queue(conflicts, missing_evidence, inferred_edges)
      manifest = canonicalize_and_hash(inputs, candidates, edges, applicability, policy)
      return immutable_candidate(manifest, review, publication_blockers)

## Failure handling
- Invalid context or inaccessible tenant: reject request.
- Missing pinned catalog release: reject; do not silently use latest.
- Missing industry mapping: preserve unassessed and emit coverage warning.
- Conflicting specialization: retain candidates and create review task.
- Cyclic hierarchy: fail validation; dependency cycles are evaluated separately by policy.
- Missing relationship endpoint: reject edge and report integrity failure.
- Partial downstream failure: retain failed execution record; retry idempotently using request key.

## APIs and events
Candidate API: POST /compositions; GET /compositions/{id}; GET /compositions/{id}/manifest; GET /compositions/{id}/conflicts; POST /compositions/{id}/decisions; POST /compositions/{id}/publish.

Candidate events: EnterpriseCompositionRequested, EnterpriseCompositionResolved, EnterpriseCompositionReviewRequired, EnterpriseCompositionApproved, EnterpriseCompositionPublished, EnterpriseCompositionFailed.

## Acceptance tests
1. Same pinned inputs yield same digest.
2. Missing applicability remains unassessed.
3. Secondary industries are fully considered; no first-N truncation.
4. Identical canonical IDs deduplicate and preserve provenance.
5. Similar names with different IDs remain distinct absent approved equivalence.
6. Specialization retains base lineage.
7. Replacement proposals do not deactivate the base capability.
8. Hierarchy cycles and dangling references fail validation.
9. Unresolved blocking conflict prevents publication.
10. Tenant boundaries are enforced.
11. Replayed idempotency key does not create duplicate composition.
12. Published composition cannot be mutated; a new version is required.
