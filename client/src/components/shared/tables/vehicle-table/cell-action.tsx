import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Book, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { Vehicle } from '@/types';
import { useDeleteVehicleMutation } from '@/redux/services/vehicle';
import { useToast } from '@/components/ui/use-toast';
import VehicleForm from './componenets/vehicle-form';

interface CellActionProps {
  data: Vehicle;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [deleteVehicle] = useDeleteVehicleMutation();

  const { toast } = useToast();

  const onConfirm = async () => {};

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id).unwrap();
      toast({ title: 'Success', description: 'Deleted successfully!' });
    } catch (error) {
      console.log(error);
      toast({ title: 'Success', description: 'Failed!' });
    }
  };
  return (
    <>
      <VehicleForm
        data={data}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/vehicles/${data._id}`)}
          >
            <Book className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(data._id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
