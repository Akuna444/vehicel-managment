import PageHead from '@/components/shared/page-head';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import AllVehicleListTable from '@/components/shared/tables/vehicle-table/componenets/all-vehicle-list-table';
import Stats from '../dashboard/components/stats';

export default function VehiclePage() {
  return (
    <div className="w-full p-4 md:p-8">
      <PageHead title="Vehicles" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Vehicles', link: '/Vehicles' }
        ]}
      />
      <Stats />
      <AllVehicleListTable />
    </div>
  );
}
