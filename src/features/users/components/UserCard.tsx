"use client";

import React, { useState } from "react";
import type { User } from "@/types/users";
import UserDetailsModal from "./UserDetailsModal";

type Props = {
  data?: User | null;
  className?: string;
};

export default function UserCard({ data, className = "" }: Props) {
  const name = `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim() || "Unknown";
  const email = data?.email ?? "—";
  const avatar = data?.avatar ?? "https://placehold.co/600x400/png";

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/png";
  };

  return (
    <article
      className={`relative overflow-hidden rounded-2xl bg-white shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-lg ${className}`}
      aria-label={`User card for ${name}`}
    >
      <div
        className="h-20 w-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg,#CACACA 0%, #838383 100%)",
        }}
        aria-hidden
      >
        <svg
          className="absolute inset-0 w-full h-20 opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 600 100"
          aria-hidden
        >
          <path d="M0 100 L600 0 L600 100 Z" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>

      <div className="px-5 pb-5 pt-8">
        <div className="flex items-start justify-between -mt-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                onError={handleAvatarError}
                className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 truncate">{name}</h3>
              <p className="mt-1 text-sm text-slate-500 truncate">{email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 mb-4">
        <button type="button" onClick={(e) => handleOpen(data as User)} className="text-sm rounded-full w-full hover:bg-primary hover:text-white duration-200 flex items-center justify-center cursor-pointer border border-primary text-primary p-2 bg-white">
          See Details
        </button>
      </div>
      <UserDetailsModal open={open} onClose={handleClose} user={selectedUser} />
    </article>
  );
}
