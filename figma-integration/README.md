# Figma Integration

**Audience: Claude and designers.** Figma is an optional visual/design environment —
never the source of truth. This folder manages the bridge between Figma and the
canonical [experience-library](../experience-library/) / [design-system](../design-system/).

- [mappings/](mappings/) — mapping between Figma components/nodes and
  experience-library templates or design-system components
- [sync/](sync/) — configuration/state for (future) two-way sync between the
  implementation environment and Figma
- [exports/](exports/) — point-in-time exports from Figma used as design references
  (not canonical, and never authoritative over what's in experience-library/)
