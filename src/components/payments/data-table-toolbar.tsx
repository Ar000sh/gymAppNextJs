// components/payments/data-table-toolbar.tsx
"use client";

import * as React from "react";
import type { Table as RTTable, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
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
import { useEffect } from "react";

type AnyTable = RTTable<any>;

type FilterVariant = "text" | "number" | "select";

function getFilterVariant(col: Column<any, unknown>): FilterVariant {
  return (col.columnDef.meta as any)?.filterVariant ?? "text";
}

function getSelectOptions(
  col: Column<any, unknown>,
): readonly string[] | undefined {
  return (col.columnDef.meta as any)?.options;
}

type props = {
  table: AnyTable;
  onSetActiveFilters: (height: any) => void;
};
export function DataTableToolbar({ table, onSetActiveFilters }: props) {
  const columns = table.getAllLeafColumns().filter((c) => c.getCanFilter());

  // Which columns have an active filter UI showing:
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const filtersRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If no active filters, there is no container in the DOM
    if (activeFilters.length === 0) {
      onSetActiveFilters(0);
      return;
    }

    let ro: ResizeObserver | null = null;
    let rafId: number | null = null;

    const measure = () => {
      // defer to the next frame to ensure DOM has painted
      rafId = window.requestAnimationFrame(() => {
        const h = filtersRef.current?.clientHeight ?? 0;
        onSetActiveFilters(h);
      });
    };

    // First measurement after render
    measure();

    // Keep in sync for any size changes
    if (filtersRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(filtersRef.current);
    }

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
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
              const label =
                (typeof col.columnDef.header === "string"
                  ? col.columnDef.header
                  : (col.columnDef.header as any)?.props?.children) ?? id;

              return (
                <DropdownMenuItem
                  key={`MenuItem-${id}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <Checkbox
                    className="data-[state=checked]:[&>span>svg]:!text-white"
                    key={id}
                    checked={activeFilters.includes(id)}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(v) => toggleActive(id, Boolean(v))}
                  ></Checkbox>
                  {label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          onClick={clearAll}
          disabled={activeFilters.length <= 0}
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

            // Label
            const label =
              (typeof col.columnDef.header === "string"
                ? col.columnDef.header
                : (col.columnDef.header as any)?.props?.children) ?? id;

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
              // Example: min/max pair
              const value =
                (col.getFilterValue() as { min?: string; max?: string }) ?? {};
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
                  placeholder={label as string}
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
