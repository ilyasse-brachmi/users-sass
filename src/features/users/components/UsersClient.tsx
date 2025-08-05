"use client";

import React, { useState } from "react";
import Toggle, { ToggleValue } from "@/components/Toggle";
import UsersDataGrid from "@/features/users/components/UsersDataGrid";
import UserCard from "@/features/users/components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/api";
import type { User } from "@/types/users";

export default function UsersClient() {
  const [view, setView] = useState<ToggleValue>("list");

  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Toggle value={view} onChange={(v) => setView(v)} />
      </div>

      {view === "list" && (
        <UsersDataGrid  />
      )}

      {view === "dashboard" && (
        <>
          {isLoading && (
            <div className="py-8 flex justify-center">
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          )}

          {isError && (
            <div className="text-center text-sm text-red-600 py-4">
              Failed to load users. Please try again.
            </div>
          )}

          {!isLoading && !isError && (!data || data.length === 0) && (
            <div className="text-center text-sm text-gray-500 py-8">No users found.</div>
          )}

          {!isLoading && !isError && data && data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 px-2">
              {data.map((user) => (
                <UserCard key={user.id ?? `${user.email}-${Math.random()}`} data={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
