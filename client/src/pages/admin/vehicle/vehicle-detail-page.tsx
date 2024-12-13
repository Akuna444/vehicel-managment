import DetailPageSkeleton from '@/components/shared/detail-page-skeleton';
import AllVehicleListTable from '@/components/shared/tables/vehicle-table/componenets/all-vehicle-list-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DetailCard from '@/components/ui/detail-card';
import { backendUrlBase } from '@/lib/utils';
import { useGetVehicleByIdQuery } from '@/redux/services/vehicle';

import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon, Pen } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { data, isError, refetch, error, isLoading } =
    useGetVehicleByIdQuery(id);

  const router = useRouter();

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  return (
    <>
      {isError ? (
        <>
          <div>Something went wrong</div>
          <p>{error.status}</p>
          <Button onClick={refetch}>Reload</Button>
        </>
      ) : (
        <>
          <Button onClick={() => router.push('/vehicles')}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
          <div className="detail__card mx-4 grid  grid-cols-1 gap-6 py-6 lg:grid-cols-4">
            <div className=" col-span-1 flex flex-col gap-6 lg:col-span-1">
              <Card className="detail__card bg-white">
                <CardHeader className="flex flex-row items-center justify-between font-bold">
                  <p className="text-xl"> Profile</p>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <img
                    src={`${backendUrlBase}/${data?.image}`}
                    className="w-full rounded-[20px]  object-cover "
                  />
                </CardContent>
              </Card>
            </div>
            {/* contact information  */}
            <Card className=" card__detail col-span-1 bg-white lg:col-span-3">
              <CardHeader className="text-xl font-bold">
                Contact Information
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-y-4">
                  <DetailCard label="Name" value={data?.name} />
                  <DetailCard label="Year" value={data?.year} />
                  <DetailCard label="Model" value={data?.model} />
                  <DetailCard label="Make" value={data?.make} />
                  <DetailCard label="Status" value={data?.status} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
