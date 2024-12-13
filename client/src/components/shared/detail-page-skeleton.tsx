import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const DetailPageSkeleton = () => {
  return (
    <div className="p-10">
      <Skeleton className="h-12 w-full" />
      <div className="flex justify-end gap-3">
        <Skeleton className="h-24 w-[12px]" />
      </div>
      <div className="flex flex-col items-center justify-between gap-6">
        <Card className=" w-full bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
          <CardHeader className="text-xl font-bold">
            <Skeleton className="h-10 w-96" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 capitalize">
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="mb-5 h-12 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </CardContent>
          <div className="my-5 flex w-full justify-center">
            <Skeleton className="h-12 w-28" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
