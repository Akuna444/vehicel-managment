import UsersTable from '..';

import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useGetAllVehiclesQuery } from '@/redux/services/vehicle';

export default function AllVehicleListTable() {
  const { data, isLoading, error } = useGetAllVehiclesQuery();
  const vehicles = data;

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  if (error) {
    return <div>Failed to fetch</div>;
  }

  return <UsersTable data={vehicles} />;
}
