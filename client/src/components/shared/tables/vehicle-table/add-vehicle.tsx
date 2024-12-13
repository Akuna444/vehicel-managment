import { useState } from 'react';
import VehicleForm from './componenets/vehicle-form';
import { Button } from '@/components/ui/button';

export default function VehicleTableWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className=" flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>Add Vehicle</Button>
      </div>
      <VehicleForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
