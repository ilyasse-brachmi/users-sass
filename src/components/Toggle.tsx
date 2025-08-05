"use client";

import React, { useEffect, useRef, useState } from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";

export type ToggleValue = "list" | "dashboard";

type Props = {
  value?: ToggleValue;
  defaultValue?: ToggleValue;
  onChange?: (v: ToggleValue) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

const sizeMap = {
  sm: { icon: 16, pad: "px-2 py-1", gap: "gap-1", rounded: "rounded-full" },
  md: { icon: 18, pad: "px-2.5 py-1.5", gap: "gap-2", rounded: "rounded-full" },
  lg: { icon: 20, pad: "px-3 py-2", gap: "gap-2", rounded: "rounded-full" },
};

export default function Toggle({
  value,
  defaultValue = "list",
  onChange,
  className = "",
  size = "md",
  ariaLabel = "Toggle view",
}: Props) {
  const isControlled = typeof value !== "undefined";
  const [internal, setInternal] = useState<ToggleValue>(defaultValue);
  const current = (isControlled ? value : internal) as ToggleValue;

  const listRef = useRef<HTMLButtonElement | null>(null);
  const dashRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
  }, [current]);

  const setValue = (v: ToggleValue) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const s = sizeMap[size];

  const commonButtonClasses =
    "flex items-center justify-center min-w-10 transition-all duration-150 text-gray-600 focus:outline-none";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex ${s.pad} ${s.gap} ${s.rounded} ms-2 border-2 border-gray-300 bg-white ${className}`}
    >
      <button
        ref={listRef}
        role="tab"
        aria-selected={current === "list"}
        aria-label="List view"
        tabIndex={0}
        onClick={() => setValue("list")}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            dashRef.current?.focus();
          } else if (e.key === "Home") {
            listRef.current?.focus();
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setValue("list");
          }
        }}
        className={`${commonButtonClasses} rounded-md p-1 ${
          current === "list"
            ? "bg-slate-900 text-white shadow-sm"
            : "bg-transparent text-slate-500 hover:bg-slate-50"
        }`}
        type="button"
      >
        <TableRowsIcon sx={{ fontSize: s.icon, color: current === "list" ? "#fff" : "#ABABAB" }} />
      </button>

      <button
        ref={dashRef}
        role="tab"
        aria-selected={current === "dashboard"}
        aria-label="Dashboard view"
        tabIndex={0}
        onClick={() => setValue("dashboard")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            listRef.current?.focus();
          } else if (e.key === "End") {
            dashRef.current?.focus();
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setValue("dashboard");
          }
        }}
        className={`${commonButtonClasses} rounded-md p-1 ${
          current === "dashboard"
            ? "bg-slate-900 text-white shadow-sm"
            : "bg-transparent text-slate-500 hover:bg-slate-50"
        }`}
        type="button"
      >
        <DashboardIcon sx={{ fontSize: s.icon, color: current === "dashboard" ? "#fff" : "#ABABAB" }} />
      </button>
    </div>
  );
}
