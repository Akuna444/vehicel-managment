import DetailPageSkeleton from '@/components/shared/detail-page-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DetailCard from '@/components/ui/detail-card';
import { backendUrlBase } from '@/lib/utils';
import { useGetVehicleByIdQuery } from '@/redux/services/vehicle';

import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { data, isError, refetch, isLoading } = useGetVehicleByIdQuery(
    id as string
  );

  const router = useRouter();

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  return (
    <>
      {isError ? (
        <>
          <div>Something went wrong</div>
          <Button onClick={refetch}>Reload</Button>
        </>
      ) : (
        <>
          <Button className="m-4" onClick={() => router.push('/vehicles')}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
          <div className="detail__card mx-4 grid  grid-cols-1 gap-6 py-6 lg:grid-cols-4">
            <div className=" col-span-1 flex flex-col gap-6 lg:col-span-1">
              <Card className="detail__card bg-white dark:bg-slate-700">
                <CardHeader className="flex flex-row items-center justify-between font-bold">
                  <p className="text-xl"> Profile</p>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <img
                    src={
                      data?.image
                        ? `${backendUrlBase}/${data?.image}`
                        : 'https://static.vecteezy.com/system/resources/previews/034/638/038/large_2x/ai-generated-toy-car-avatar-icon-clip-art-sticker-decoration-simple-background-free-photo.jpg'
                    }
                    className="w-full rounded-[20px]  object-cover "
                  />
                </CardContent>
              </Card>
            </div>
            {/* contact information  */}
            <Card className=" card__detail bg- col-span-1 dark:bg-slate-700 lg:col-span-3">
              <CardHeader className="text-xl font-bold">
                Vehicle Information
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-y-4">
                  <DetailCard label="Name" value={data?.name as string} />
                  <DetailCard
                    label="Year"
                    value={data?.year.toString() as string}
                  />
                  <DetailCard label="Model" value={data?.model as string} />
                  <DetailCard label="Make" value={data?.make as string} />
                  <DetailCard label="Status" value={data?.status as string} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
