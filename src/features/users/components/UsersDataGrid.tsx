"use client";

import * as React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/api';
import DataGridComponent from "@/components/DataGridComponent"
import { useState } from 'react';
import { User } from '@/types/users';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserDetailsModal from './UserDetailsModal';


export default function DataTable() {

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

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


  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: (params) => (
        <img
          src={params.value}
          alt="avatar"
          className="rounded-full"
          style={{ width: 40, height: 40, objectFit: 'cover' }}
        />
      ),
      sortable: false,
      filterable: false,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'first_name',
      headerName: 'First name',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const userRow = params.row;
        return (
          <IconButton
            aria-label={`view ${userRow.first_name}`}
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              handleOpen(userRow)
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <DataGridComponent data={data} gridCols={columns} />
      <UserDetailsModal open={open} onClose={handleClose} user={selectedUser} />
    </>
  );
}
