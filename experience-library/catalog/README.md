# Catalog

Machine-readable index/metadata of every template and pattern in the experience
library: what exists, its status (DRAFT/EXPERIMENTAL/VALIDATED/PRODUCTION-READY/
STANDARD/DEPRECATED — see [`docs/template-specification.md`](../../docs/template-specification.md)),
version, and the PRD/FRD or UX decision it originated from. This is the first place
Claude should query when asked to build or configure an experience, so existing
patterns are reused instead of reinvented.

**The concrete implementation of this index is
[`templates/registry/template-registry.json`](../../templates/registry/template-registry.json)**,
documented in [`templates/registry/README.md`](../../templates/registry/README.md).
This folder is kept as the conceptual home of "the catalog" referenced elsewhere in
this repository's documentation; the registry file itself lives under `templates/` so
it sits alongside the templates it indexes.
