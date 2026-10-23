# Agent

**Audience: Claude.** Owned/reviewed by humans, but this is Claude's operating
material for acting as the FYNXT Product Experience Engine agent.

- [skills/](skills/) — Claude Agent Skills specific to this system (e.g. "search the
  experience library", "configure a template from a PRD")
- [commands/](commands/) — slash-command style agent commands for this system
- [context/](context/) — curated, condensed context Claude should load to reuse past
  FYNXT product decisions and patterns without re-deriving them from raw
  [product-knowledge](../product-knowledge/)

Nothing here should introduce new business rules or UX patterns — it packages and
indexes what already exists elsewhere in this repo for Claude's reuse.
