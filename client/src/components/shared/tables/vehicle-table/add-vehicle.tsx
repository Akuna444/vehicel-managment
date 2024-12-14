import { useState } from 'react';
import VehicleForm from './componenets/vehicle-form';
import { Button } from '@/components/ui/button';

export default function VehicleTableWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className=" col-span-2 flex w-full justify-center md:col-span-1">
        <Button
          className="w-full md:w-fit"
          onClick={() => setIsModalOpen(true)}
        >
          Add Vehicle
        </Button>
      </div>
      <VehicleForm
        data={null}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
