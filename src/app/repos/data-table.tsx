"use client";

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
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/app/repos/data-table-pagination";
import { Input } from "@/components/ui/input";
import { Repo } from "@/types/types";
import { fetchRepos } from "@/lib/utils";
import { track } from "@vercel/analytics";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

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
  const [loading, setLoading] = useState(true); // Add loading state
  const { toast } = useToast();

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
        pageSize: 10,
      },
    },
  });

  const selectedRowCount = Object.keys(rowSelection).length;
  const isMultipleRowsSelected = selectedRowCount > 1;

  const fetchUpdatedData = useCallback(async () => {
    if (!session) return;
    try {
      setLoading(true); // Set loading to true when fetching data
      const repos = await fetchRepos(session.accessToken!);
      if (repos) {
        setData(repos as TData[]);
      }
    } catch (error) {
      console.error("Failed to fetch repos:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [session]);

  useEffect(() => {
    fetchUpdatedData();
  }, [fetchUpdatedData]);

  const refreshData = () => {
    setRowSelection({});
    table.getColumn("name")?.setFilterValue("");
    fetchUpdatedData();
  };

  const handleDeleteRepos = async () => {
    const selectedRepos = getSelectedReposByIdx();
    const response = await fetch("/api/delete-repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedRepos),
    });

    const result = await response.json();
    if (response.ok) {
      const updateResponse = await fetch("/api/updateAirtableValue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fieldName: "total_repos_deleted",
          value: selectedRepos.length,
        }),
      });

      if (updateResponse.ok) {
        toast({
          title: "Repo(s) deleted successfully",
        });
        track("repo_deleted", {
          count: selectedRepos.length,
        });
        fetchUpdatedData();
        setRowSelection({});
      } else {
        console.error(
          "Failed to update Airtable:",
          await updateResponse.text()
        );
      }
    } else {
      console.error("Failed to delete repos:", result.error);
    }
  };

  const getSelectedReposByIdx = () =>
    Object.keys(rowSelection).map((key: string) => data[Number(key)]);

  const renderDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete{" "}
          {selectedRowCount > 0 &&
            `${selectedRowCount} repo${isMultipleRowsSelected ? "s" : ""}`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Delete {selectedRowCount} repo{isMultipleRowsSelected ? "s" : ""}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete the selected repo{isMultipleRowsSelected ? "s" : ""}?
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
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <Button onClick={refreshData} variant="ghost" className="ml-2">
          <RefreshCw size={15} />
        </Button>
        <div className="ml-auto">{selectedRowCount > 0 && renderDialog()}</div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? ( // Show loading indicator when loading is true
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 w-full text-center"
                >
                  <Loader className="mx-auto animate-spin h-8 w-8 text-gray-500" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
