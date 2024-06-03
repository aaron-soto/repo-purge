'use client';

import { useState } from 'react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Repo } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const RepoActionsCell = ({ row }: any) => {
  const repo: Repo = row.original;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const handleDelete = () => {
    setDialogOpen(false);
    if (selectedRepo) {
      // Delete the repo

      toast({
        title: 'Repository deleted',
        variant: 'destructive',
        description: `${selectedRepo.name} has been deleted!`,
      });
      setSelectedRepo(null);
    }
  };

  const handleOpenDialog = (repo: Repo) => {
    setSelectedRepo(repo);
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(repo.html_url);
              toast({
                title: 'Copied to clipboard',
                description: 'The Repo URL has been copied!',
              });
            }}
          >
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href={repo.html_url} target="_blank">
              Visit Repo
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => handleOpenDialog(repo)}
          >
            Delete Repo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete &apos;{selectedRepo?.name}&apos; repository?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will delete the repository from
              GitHub.
            </DialogDescription>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SelectCell = ({ row }: any) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={value => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};

const DescriptionCell = ({ getValue }: any) => {
  const description = getValue();
  return description ? description : <span className="text-muted">-</span>;
};

export const columns: ColumnDef<Repo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: SelectCell,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: DescriptionCell,
  },
  {
    accessorKey: 'visibility',
    header: 'Visibility',
  },
  {
    id: 'actions',
    cell: RepoActionsCell,
  },
];
