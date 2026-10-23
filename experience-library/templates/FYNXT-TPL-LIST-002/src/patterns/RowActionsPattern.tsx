import { useEffect, useRef, useState } from "react";
import type { ListAction, ListRecord } from "../template/types";
import { IconMoreVertical } from "../template/icons";

/**
 * RowActionsPattern — the reusable Row Action pattern (a default/reference
 * implementation). Per the Row Action Pattern Boundary
 * (docs/golden-template-list-specification.md Revision 2's Pattern Boundary
 * Architecture, and docs/visual-alignment-audit.md's FYNXT Table Row Action Rule),
 * this pattern — NOT TableList itself — is responsible for:
 *
 *   - determining whether a View action exists (via `ListAction.isView`, never
 *     inferred from a key/label),
 *   - determining action priority (via `ListAction.priority`, falling back to
 *     configured order — never an arbitrary guess),
 *   - deciding how many actions are directly visible vs. in overflow,
 *   - rendering the overflow menu and exposing the remaining actions.
 *
 * TableList.tsx only provides the row-action region, places it in a frozen
 * column, and passes the (already permission-filtered) configured actions
 * straight through — it does no action-count math itself.
 *
 * FYNXT Table Row Action Rule (docs/visual-alignment-audit.md):
 *   0 actions      -> no action column (handled by TableList, not here)
 *   1 action       -> [Action]
 *   2 actions      -> [Action 1] [Action 2]
 *   3+ actions     -> [Priority 1] [Priority 2] [⋮ overflow: the rest]
 *   View present   -> View is always directly visible, in the first slot;
 *                     the rule above then applies to (View + the rest) as a
 *                     single ordered list — i.e. View "spends" one of the two
 *                     direct-visibility slots.
 */

const MAX_DIRECT_VISIBLE = 2;

function orderActions(actions: ListAction[]): ListAction[] {
  const viewAction = actions.find((a) => a.isView);
  const rest = actions.filter((a) => a !== viewAction);
  const originalIndex = new Map(actions.map((a, i) => [a, i]));

  const sortedRest = [...rest].sort((a, b) => {
    const pa = a.priority;
    const pb = b.priority;
    if (pa != null && pb != null) return pa - pb;
    if (pa != null) return -1;
    if (pb != null) return 1;
    return (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0);
  });

  return viewAction ? [viewAction, ...sortedRest] : sortedRest;
}

export interface RowActionsPatternProps {
  record: ListRecord;
  actions: ListAction[];
  disabled?: boolean;
}

export function RowActionsPattern({ record, actions, disabled }: RowActionsPatternProps) {
  if (actions.length === 0) return null;

  const ordered = orderActions(actions);
  const visible = ordered.slice(0, MAX_DIRECT_VISIBLE);
  const overflow = ordered.slice(MAX_DIRECT_VISIBLE);

  return (
    <div className="tpl-list-row-actions">
      {visible.map((action) => (
        <DirectActionButton key={action.key} action={action} record={record} disabled={disabled} />
      ))}
      {overflow.length > 0 ? (
        <OverflowMenu record={record} actions={overflow} disabled={disabled} />
      ) : null}
    </div>
  );
}

function isActionDisabled(action: ListAction, records: ListRecord[]): boolean {
  return typeof action.disabled === "function" ? action.disabled(records) : Boolean(action.disabled);
}

function DirectActionButton({
  action,
  record,
  disabled,
}: {
  action: ListAction;
  record: ListRecord;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="tpl-list-row-actions__direct-button"
      disabled={disabled || isActionDisabled(action, [record])}
      data-destructive={action.destructive ? "true" : undefined}
      onClick={() => void action.onSelect([record])}
    >
      {action.label}
    </button>
  );
}

function OverflowMenu({
  record,
  actions,
  disabled,
}: {
  record: ListRecord;
  actions: ListAction[];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div className="tpl-list-row-actions__overflow" ref={menuRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`More actions for ${record.id}`}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="tpl-list-row-actions__trigger"
      >
        <IconMoreVertical />
      </button>
      {open ? (
        <ul role="menu" className="tpl-list-row-actions__menu">
          {actions.map((action) => (
            <li role="none" key={action.key}>
              <button
                role="menuitem"
                type="button"
                disabled={isActionDisabled(action, [record])}
                data-destructive={action.destructive ? "true" : undefined}
                onClick={() => {
                  setOpen(false);
                  void action.onSelect([record]);
                }}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
