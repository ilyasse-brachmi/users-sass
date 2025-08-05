"use client";

import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const paginationModel = { page: 0, pageSize: 5 };

interface Props {
  gridCols: GridColDef[];
  data: GridRowsProp;
}

export default function DataTable({ gridCols, data }: Props ) {

  return (
    <Paper sx={{ width: '100%', minHeight: 400 }}>
      <DataGrid
        rows={data}
        columns={gridCols}
        initialState={{ 
          pagination: { 
            paginationModel: { pageSize: 10, page: 0 } 
          } 
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
