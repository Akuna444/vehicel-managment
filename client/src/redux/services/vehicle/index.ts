import apiSlice from '@/redux/services/rootAPI';
import { Vehicle } from '@/types';

interface UpdateVehicle {
  id: string;
  data: Partial<Vehicle>;
}

// Extend the `apiSlice` with typed endpoints
export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query<Vehicle[], void>({
      query: () => ({
        url: `/vehicle/all`
      }),
      providesTags: ['Vehicles']
    }),
    getVehicleById: builder.query<Vehicle, string>({
      query: (id) => ({
        url: `/vehicle/one/${id}`
      }),
      providesTags: ['OneVehicles']
    }),
    countVehicles: builder.query<{ count: string }, void>({
      query: () => ({
        url: `/vehicle/count`
      }),
      providesTags: ['VehiclesCount']
    }),
    postVehicle: builder.mutation<Vehicle, Vehicle>({
      query: (data) => ({
        url: '/vehicle/add',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Vehicles', 'VehiclesCount']
    }),
    updateVehicle: builder.mutation<Vehicle, UpdateVehicle>({
      query: ({ id, data }) => ({
        url: `/vehicle/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Vehicles']
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicle/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vehicles', 'VehiclesCount']
    })
  })
});

// Export hooks with their types automatically inferred
export const {
  useGetAllVehiclesQuery,
  useDeleteVehicleMutation,
  usePostVehicleMutation,
  useUpdateVehicleMutation,
  useCountVehiclesQuery,
  useGetVehicleByIdQuery
} = vehicleApiSlice;
