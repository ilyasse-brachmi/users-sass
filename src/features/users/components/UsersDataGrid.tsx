"use client";

import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/api';
import DataGridComponent from "@/components/DataGridComponent"

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
];

export default function DataTable() {

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  return (
    <DataGridComponent data={data} gridCols={columns} />
  );
}
