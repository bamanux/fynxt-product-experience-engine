# Design System

**Audience: humans (Design System team authors; Claude and frontend code consume).**

The canonical visual/foundational design language. Figma may be used to *visualize*
this, but the files here are the source of truth, per the system's principles.

- [tokens/](tokens/) — design tokens (color, spacing, typography, etc.) as data/code
- [components/](components/) — component-level design specs and their code contracts
- [guidelines/](guidelines/) — usage guidelines, accessibility rules, do/don't documentation

## Frontend code

`tokens/` will eventually contain generated, executable token code (e.g. CSS
variables / JSON consumed by build tooling) — see the root [README.md](../README.md)
status note.
