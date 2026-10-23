/**
 * FYNXT-TPL-LIST-002 — icon set.
 *
 * Every path below is copied verbatim from real FDS-101 icon primitives (page
 * "01 · Primitives — Icons", verified via Figma Dev Mode `get_design_context`) —
 * not invented, not a generic icon-library substitute. Each component documents
 * the exact FDS-101 node it was read from so the mapping can be re-verified.
 * `stroke="currentColor"` replaces FDS-101's literal `#404040` so these inherit
 * whatever text color their button/context already uses (e.g. white on the
 * primary pagination pill) instead of always rendering FDS-101's default
 * foreground color regardless of context.
 *
 * No FDS-101 icon primitive corresponds to a "view details"/"edit"/"delete" row
 * action — those are entity-specific and come from `examples/*\/config`, not this
 * file, matching the same template/example boundary as everything else here.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** FDS-101 `icon/chevron-left` (24px symbol), node 37:190. */
export function IconChevronLeft(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** FDS-101 `icon/chevron-right` (24px symbol), node 37:181. */
export function IconChevronRight(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** FDS-101 `icon/more-vertical` (24px symbol), node 37:170. */
export function IconMoreVertical(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** FDS-101 `icon/search` (16px symbol), node 40:770. */
export function IconSearch(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 14L11.1067 11.1067"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** FDS-101 `icon/filter` (16px symbol), node 40:783. */
export function IconFilter(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.66667 13.3333C6.66661 13.4572 6.70107 13.5787 6.76619 13.6841C6.83131 13.7895 6.92451 13.8746 7.03533 13.93L8.36867 14.5967C8.47033 14.6475 8.58329 14.6714 8.69683 14.6663C8.81036 14.6612 8.9207 14.6271 9.01735 14.5673C9.11401 14.5075 9.19378 14.424 9.24908 14.3247C9.30438 14.2254 9.33339 14.1137 9.33333 14V9.33333C9.33348 9.00292 9.45631 8.68433 9.678 8.43933L14.4933 3.11333C14.5796 3.01771 14.6364 2.89912 14.6567 2.77192C14.6771 2.64472 14.6601 2.51435 14.6079 2.39658C14.5557 2.27881 14.4706 2.17868 14.3627 2.1083C14.2548 2.03792 14.1288 2.0003 14 2H2C1.87107 2.00005 1.74492 2.03748 1.63683 2.10776C1.52874 2.17804 1.44335 2.27815 1.391 2.39598C1.33865 2.5138 1.32159 2.64427 1.34188 2.77159C1.36217 2.89892 1.41895 3.01762 1.50533 3.11333L6.322 8.43933C6.54369 8.68433 6.66652 9.00292 6.66667 9.33333V13.3333Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** FDS-101 `icon/columns-3` (16px symbol), node 37:73. */
export function IconColumns3(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 2V14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2V14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
