# FYNXT Product Experience Engine

An internal system for the FYNXT Product Design and Development teams. This is **not** a
generic AI UI generator — it is a governed system for capturing product understanding,
reusing approved experience patterns, and producing production-grade frontend
implementations.

## Pipeline

```
PRD + FRD + Product Context
  -> FYNXT Experience Library
  -> Claude Agent
  -> Reusable Template
  -> Configured Product Experience
  -> Production-grade Frontend
  -> Designer Review
  -> Developer Integration
  -> Production
```

## Principles

- Product understanding is more important than visual design.
- Existing FYNXT patterns are always searched before creating something new.
- Reusability is a primary objective.
- Business rules and UX patterns are never invented — only used from approved sources.
- Experimental solutions are not automatically promoted into standard templates.
- Designer judgement remains authoritative for product experience decisions.
- Developers can consume production-ready frontend templates without requiring Figma.
- Figma is a supporting visual tool, not the canonical source of truth. The
  [experience-library](experience-library/) is.

See [governance/principles](governance/principles/) for the canonical, versioned copy of
these principles.

## Folder map

| Folder | Purpose |
|---|---|
| [governance/](governance/) | Rules, ownership, and decision-making authority for the whole system |
| [product-knowledge/](product-knowledge/) | PRDs, FRDs, personas, business rules, glossary |
| [ux/](ux/) | UX decisions and approved interaction/UX patterns |
| [design-system/](design-system/) | Tokens, components, guidelines |
| [experience-library/](experience-library/) | Source of truth for reusable product experience templates and patterns |
| [frontend/](frontend/) | Configured, product-specific frontend built from the experience library |
| [agent/](agent/) | Claude's skills, commands, and reusable context (incl. [FDI design agent](agent/fdi/README.md)) |
| [design-cases/](design-cases/) | Design Case Files produced by FDI and reviewed by humans |
| [figma-integration/](figma-integration/) | Optional Figma sync, mappings, exports |
| [qa/](qa/) | Design QA and automated product/design quality checks |
| [developer-handoff/](developer-handoff/) | Specs and guides for developers integrating an experience |
| [versioning/](versioning/) | Version registry and changelogs for templates/patterns/design system |
| [history/](history/) | Archive of superseded decisions, patterns, and templates |
| [docs/](docs/) | Documentation about this system itself |

## Status

Architecture initialization only. No application, agent, Figma integration, or frontend
templates have been built yet.
