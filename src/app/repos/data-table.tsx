'use client';

import { DataTablePagination } from '@/app/repos/data-table-pagination';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { fetchRepos, mapToRepos } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const [data, setData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    const toastFlag = localStorage.getItem('deleteToast');
    if (toastFlag) {
      toast({
        title: 'Repo(s) deleted successfully',
      });
      localStorage.removeItem('deleteToast');
    }
  }, [toast]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  const selectedRowCount = Object.keys(rowSelection).length;
  const isMultipleRowsSelected = selectedRowCount > 1;

  const fetchUpdatedData = useCallback(async () => {
    if (!session) return;
    try {
      const repos = await fetchRepos(session.accessToken!);
      if (repos) {
        console.log(repos);
        setData(repos);
      }
    } catch (error) {
      console.error('Failed to fetch repos:', error);
    }
  }, [session]);

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  const handleDeleteRepos = async () => {
    const selectedRepos = getSelectedReposByIdx();
    const response = await fetch('/api/delete-repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapToRepos(selectedRepos)),
    });

    const result = await response.json();
    if (response.ok) {
      setRowSelection({});

      const updateResponse = await fetch('/api/updateAirtableValue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fieldName: 'total_repos_deleted',
          value: selectedRepos.length,
        }),
      });

      if (updateResponse.ok) {
        // Check if response is not empty before parsing
        const resText = await updateResponse.text();
        const resData = resText ? JSON.parse(resText) : null;

        console.log(resData);

        localStorage.setItem('deleteToast', 'true');
        window.location.reload();
      } else {
        console.error(
          'Failed to update Airtable:',
          await updateResponse.text(),
        );
      }
    } else {
      console.error('Failed to delete repos:', result.error);
    }
  };

  const getSelectedReposByIdx = () =>
    Object.keys(rowSelection).map((key: string) => data[Number(key)]);

  const renderDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <span className="px-4  py-2 ml-4 font-medium text-white bg-red-500 rounded cursor-pointer md:ml-0 lg:flex hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2">
          Delete{' '}
          {selectedRowCount > 0 &&
            `${selectedRowCount} repo${isMultipleRowsSelected ? 's' : ''}`}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Delete {selectedRowCount} repo{isMultipleRowsSelected ? 's' : ''}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete the selected repo{isMultipleRowsSelected ? 's' : ''}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeleteRepos}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center py-4">
        <Input
          placeholder="Filter repos..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <div className="ml-auto">{selectedRowCount > 0 && renderDialog()}</div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination className="mt-4" table={table} />
    </div>
  );
}
