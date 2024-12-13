/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useToast } from '@/components/ui/use-toast';
import {
  usePostVehicleMutation,
  useUpdateVehicleMutation
} from '@/redux/services/vehicle';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Vehicle } from '@/types';

const VehicleForm = ({
  data = null,
  isModalOpen,
  setIsModalOpen
}: {
  data: Vehicle | null;
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
}) => {
  const [addVehicle, { isLoading: addIsLoading }] = usePostVehicleMutation();
  const [updateVehicle, { isLoading: updateIsLoading }] =
    useUpdateVehicleMutation();

  const { toast } = useToast();

  // Zod schema for validation
  const formSchema = z.object({
    name: z.string().nonempty('Vehicle name is required'),
    make: z.string().nonempty('Vehicle make is required'),
    model: z.string().nonempty('Vehicle model is required'),
    year: z
      .number()
      .min(1886, 'Year must be valid')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    status: z.enum(['active', 'inactive'], {
      required_error: 'Vehicle status is required'
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || '',
      make: data?.make || '',
      model: data?.model || '',
      year: data?.year || new Date().getFullYear(),
      status: (data?.status as 'active' | 'inactive') || 'active'
    }
  });

  const [image, setImage] = useState(null);

  const handleFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        await updateVehicle({
          id: data._id,
          data: {
            ...formData,
            year: formData.year.toString()
          }
        }).unwrap();
        toast({
          title: 'Success',
          description: 'Vehicle updated successfully!'
        });
      } else {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('make', formData.make);
        data.append('model', formData.model);
        data.append('year', formData.year.toString());
        data.append('status', formData.status);
        if (image) data.append('image', image[0]);
        await addVehicle(data).unwrap();
        toast({ title: 'Success', description: 'Vehicle added successfully!' });
      }

      reset();
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update vehicle. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {' '}
              {data ? 'Update Vehicle' : 'Add Vehicle'}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Name
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Enter vehicle name"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Make
              </label>
              <input
                type="text"
                {...register('make')}
                placeholder="Enter vehicle make"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.make && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.make.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Model
              </label>
              <input
                type="text"
                {...register('model')}
                placeholder="Enter vehicle model"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.model.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Year
              </label>
              <input
                type="number"
                {...register('year', { valueAsNumber: true })}
                placeholder="Enter vehicle year"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.year.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Status
              </label>
              <select
                {...register('status')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>

            {!data && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => setImage(e.target.files)}
                  className="mt-1 w-full"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button disabled={addIsLoading || updateIsLoading} type="submit">
                {addIsLoading || updateIsLoading
                  ? 'Loading...'
                  : data
                    ? 'Update Vehicle'
                    : 'Add Vehicle'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleForm;
