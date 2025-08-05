"use client";

import React from "react";

export default function UsersFallback({ view = "list" }: { view?: "list" | "dashboard" }) {
  if (view === "list") {
    return (
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 font-semibold text-sm text-gray-500">Loading Users...</div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center px-4 py-3 border-t border-gray-100 animate-pulse"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex flex-col flex-1 ml-4 gap-2">
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl shadow border border-gray-100 animate-pulse"
        >
          <div className="h-20 w-full bg-gray-200 rounded-t-xl mb-6" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-3 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
