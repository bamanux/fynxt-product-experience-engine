# Experience Library

**Audience: Claude and humans — this is the core of the system.**

The FYNXT Experience Library is the **source of truth** for reusable product
experiences — not Figma. Claude must search this folder before proposing or building
anything new, and any new validated pattern becomes reusable by landing here (only
after designer review, never automatically).

- [templates/](templates/) — reusable, production-grade experience templates (executable
  frontend code + configuration) that designers configure and developers can consume
  directly, without requiring Figma
- [patterns/](patterns/) — smaller reusable experience fragments not yet promoted to a
  full template
- [catalog/](catalog/) — machine-readable index of every template and pattern (status,
  version, owning PRD/FRD, description) — this is what Claude should query first to
  avoid reinventing an existing pattern

## Frontend code

`templates/` is a primary location for executable frontend code in this system.
