"use client";

import React, { useState } from "react";
import Toggle, { ToggleValue } from "@/components/Toggle";
import UsersDataGrid from "@/features/users/components/UsersDataGrid";
import UserCard from "@/features/users/components/UserCard";
import Pagination from "@/components/Pagination"; // Import your new pagination component
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/api";
import type { User } from "@/types/users";
import UsersFallback from "./UsersFallback";
import { FetchResponse } from "@/types/global";

export default function UsersClient() {
  const [view, setView] = useState<ToggleValue>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { data, isLoading, isError } = useQuery<FetchResponse<User>>({
    queryKey: ["users", currentPage, itemsPerPage],
    queryFn: () => getUsers(currentPage, itemsPerPage),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleViewChange = (newView: ToggleValue) => {
    setView(newView);
  };

  if (isLoading && !data) {
    return <UsersFallback view={view} />;
  }

  const users = data?.data || [];
  const showPagination = !isError && data && data.total > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Toggle value={view} onChange={handleViewChange} />
      </div>

      {view === "list" && (
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

          {!isError && users.length === 0 && !isLoading && (
            <div className="text-center text-sm text-gray-500 py-8">No users found.</div>
          )}

          {!isError && users.length > 0 && (
            <>
              <UsersDataGrid
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
              {showPagination && (
                <Pagination
                  currentPage={data.page}
                  totalPages={data.total_pages}
                  totalItems={data.total}
                  itemsPerPage={data.per_page}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              )}
            </>
          )}
        </>
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

          {!isError && users.length === 0 && !isLoading && (
            <div className="text-center text-sm text-gray-500 py-8">No users found.</div>
          )}

          {!isError && users.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 px-2">
                {users.map((user) => (
                  <UserCard key={user.id ?? `${user.email}-${Math.random()}`} data={user} />
                ))}
              </div>
              {showPagination && (
                <Pagination
                  currentPage={data.page}
                  totalPages={data.total_pages}
                  totalItems={data.total}
                  itemsPerPage={data.per_page}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}