// components/payments/data-table-toolbar.tsx
"use client";

import * as React from "react";
import type { Table as RTTable, Column } from "@tanstack/react-table";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterVariant = "text" | "number" | "select";
type ColumnMeta = {
  filterVariant?: FilterVariant;
  options?: readonly string[];
};

function resolveMeta<TData>(col: Column<TData, unknown>): ColumnMeta {
  return (col.columnDef.meta as ColumnMeta) ?? {};
}

function getFilterVariant<TData>(col: Column<TData, unknown>): FilterVariant {
  return resolveMeta(col).filterVariant ?? "text";
}

function getSelectOptions<TData>(
  col: Column<TData, unknown>,
): readonly string[] | undefined {
  return resolveMeta(col).options;
}

type ToolbarProps<TData> = {
  table: RTTable<TData>;
  onSetActiveFilters: (height: number) => void;
};

export function DataTableToolbar<TData>({
  table,
  onSetActiveFilters,
}: ToolbarProps<TData>) {
  const columns = table.getAllLeafColumns().filter((c) => c.getCanFilter());

  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const filtersRef = React.useRef<HTMLDivElement | null>(null);

  // Measure the filters container height and report it up
  React.useEffect(() => {
    if (activeFilters.length === 0) {
      onSetActiveFilters(0);
      return;
    }

    let ro: ResizeObserver | null = null;
    let rafId: number | null = null;

    const measure = () => {
      rafId = window.requestAnimationFrame(() => {
        const h = filtersRef.current?.clientHeight ?? 0;
        onSetActiveFilters(h);
      });
    };

    measure();

    if (filtersRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(measure);
      ro.observe(filtersRef.current);
    }

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [activeFilters, onSetActiveFilters]);

  const toggleActive = (id: string, checked: boolean) => {
    setActiveFilters((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id),
    );
    if (!checked) table.getColumn(id)?.setFilterValue(undefined);
  };

  const clearAll = () => {
    setActiveFilters([]);
    table.resetColumnFilters();
  };

  const labelFor = (col: Column<TData, unknown>): string => {
    const header = col.columnDef.header;
    // Keep it strict: only accept string headers; otherwise use the column id.
    return typeof header === "string" ? header : col.id;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Top row: Filter dropdown + Clear */}
      <div className="flex items-center gap-2">
        <DropdownMenu onOpenChange={setOpen} open={open} modal={false}>
          <DropdownMenuTrigger asChild>
            <Button>Filters</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Select filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((col) => {
              const id = col.id;
              const label = labelFor(col);
              const isActive = activeFilters.includes(id);

              return (
                <DropdownMenuItem
                  key={`MenuItem-${id}`}
                  // Prevent closing the menu when clicking inside
                  onClick={(e) => e.preventDefault()}
                >
                  <Checkbox
                    className="data-[state=checked]:[&>span>svg]:!text-white"
                    checked={isActive}
                    // Radix type = boolean | "indeterminate"
                    onCheckedChange={(v: CheckedState) =>
                      toggleActive(id, v === true)
                    }
                    // Prevent space/enter from closing
                    onSelect={(e) => e.preventDefault()}
                  />
                  <span className="ml-2">{label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          onClick={clearAll}
          disabled={activeFilters.length === 0}
        >
          Clear all
        </Button>
      </div>

      {/* Active filter inputs */}
      {activeFilters.length > 0 && (
        <div
          id="filters-container"
          ref={filtersRef}
          className="flex flex-wrap items-center gap-4 bg-white"
        >
          {activeFilters.map((id) => {
            const col = table.getColumn(id);
            if (!col) return null;

            const variant = getFilterVariant(col);
            const label = labelFor(col);

            if (variant === "select") {
              const options = getSelectOptions(col) ?? [];
              return (
                <div key={id} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{label}:</span>
                  <Select
                    value={(col.getFilterValue() as string) ?? ""}
                    onValueChange={(v) => col.setFilterValue(v || undefined)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      {options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            if (variant === "number") {
              type Range = { min?: string; max?: string };
              const value: Range = (col.getFilterValue() as Range) ?? {};
              return (
                <div key={id} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{label}:</span>
                  <Input
                    type="number"
                    placeholder="Min"
                    className="w-24"
                    value={value.min ?? ""}
                    onChange={(e) =>
                      col.setFilterValue({
                        ...value,
                        min: e.target.value || undefined,
                      })
                    }
                  />
                  <span>–</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="w-24"
                    value={value.max ?? ""}
                    onChange={(e) =>
                      col.setFilterValue({
                        ...value,
                        max: e.target.value || undefined,
                      })
                    }
                  />
                </div>
              );
            }

            // default: text contains
            return (
              <div key={id} className="flex items-center gap-2">
                <Input
                  placeholder={label}
                  className="w-56"
                  value={(col.getFilterValue() as string) ?? ""}
                  onChange={(e) =>
                    col.setFilterValue(e.target.value || undefined)
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
