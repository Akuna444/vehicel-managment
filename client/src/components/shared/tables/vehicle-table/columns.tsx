import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { backendUrl, backendUrlBase } from '@/lib/utils';

export const columns: ColumnDef<Vehicle>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NAME
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'make',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          MAKE
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'model',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          MODEL
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },

  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          YEAR
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          STATUS
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) =>
      row.original.image ? (
        <img
          src={`${backendUrlBase}/${row.original.image}`}
          alt={row.original.name}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ) : (
        'No Image'
      )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
