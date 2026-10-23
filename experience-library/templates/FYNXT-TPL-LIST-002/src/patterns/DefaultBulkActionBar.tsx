import type { ListAction, ListRecord } from "../template/types";

/**
 * DefaultBulkActionBar — a minimal default implementation of the "Bulk Actions"
 * extension point, NOT the Bulk Action Bar pattern itself. See
 * DefaultRowActionsMenu.tsx for the same caveat. Swap via TableList's
 * `renderBulkActionBar` prop once a real pattern is registered.
 *
 * Renders only when `selectedRecords.length > 0` — selection gates bulk-action
 * visibility, per Revision 2, Section 9 (the one relationship the specification
 * treats as genuinely fixed).
 */

export interface DefaultBulkActionBarProps {
  selectedRecords: ListRecord[];
  actions: ListAction[];
  onActionResult?: (failedRecordIds: string[]) => void;
  disabled?: boolean;
}

export function DefaultBulkActionBar({
  selectedRecords,
  actions,
  onActionResult,
  disabled,
}: DefaultBulkActionBarProps) {
  if (selectedRecords.length === 0 || actions.length === 0) return null;

  return (
    <div
      className="tpl-list-bulk-bar"
      role="region"
      aria-label="Bulk actions"
    >
      <span className="tpl-list-bulk-bar__count">
        {selectedRecords.length} selected
      </span>
      {actions.map((action) => {
        const isDisabled =
          disabled ||
          (typeof action.disabled === "function"
            ? action.disabled(selectedRecords)
            : Boolean(action.disabled));
        return (
          <button
            key={action.key}
            type="button"
            disabled={isDisabled}
            data-destructive={action.destructive ? "true" : undefined}
            onClick={async () => {
              const result = await action.onSelect(selectedRecords);
              if (result && result.failedRecordIds.length > 0) {
                onActionResult?.(result.failedRecordIds);
              }
            }}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
