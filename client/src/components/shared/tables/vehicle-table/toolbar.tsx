import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/shared/tables/components/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/shared/tables/components/data-table-view-options';
import { statuses, carModels } from './filters';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import ExportButton from '@/components/shared/tables/components/export-button';
import VehicleTableWithModal from './add-vehicle';
import { ListFilter } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columns = table.getAllColumns().map((columns) => columns.id);
  const data = table.options.data;
  return (
    <div className="dark:bg-dark-var2  grid grid-cols-2 gap-2 rounded-t-xl  py-5 md:grid-cols-6">
      <div
        className={`${isFiltered ? 'col-span-1' : 'col-span-2'} flex w-full flex-1 items-center space-x-2 transition-all duration-300 ease-in-out `}
      >
        <Input
          placeholder="Search By Name"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-full  md:w-full"
        />
      </div>

      {isFiltered && (
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 transition-all duration-300 ease-in-out lg:px-3"
          >
            Reset
            <Icons.cancel className="ml-2 h-4 w-4" />
          </Button>

          {/* <Button className=" dark:text-white md:text-base" variant={'ghost'}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button> */}
        </div>
      )}

      <div className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button className=" dark:text-white md:text-base" variant={'ghost'}>
              <ListFilter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="start">
            <Command>
              <CommandInput placeholder={'Fiter...'} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>
                    {table.getColumn('status') && (
                      <DataTableFacetedFilter
                        column={table.getColumn('status')}
                        title="Status"
                        options={statuses}
                      />
                    )}
                  </CommandItem>
                  <CommandItem>
                    {table.getColumn('model') && (
                      <DataTableFacetedFilter
                        column={table.getColumn('model')}
                        title="Model"
                        options={carModels}
                      />
                    )}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-3">
        <ExportButton data={data} columns={columns} filename="vehicle-list" />
      </div>

      <VehicleTableWithModal />

      <DataTableViewOptions table={table} />
    </div>
  );
}
