import apiSlice from '@/redux/services/rootAPI';

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: () => ({
        url: `/vehicle/all`
      }),
      providesTags: ['Vehicles']
    }),
    getVehicleById: builder.query({
      query: (id) => ({
        url: `/vehicle/one/${id}`
      }),
      providesTags: ['OneVehicles']
    }),
    countVehicles: builder.query({
      query: () => ({
        url: `/vehicle/count`
      }),
      providesTags: ['VehiclesCount']
    }),
    postVehicle: builder.mutation({
      query: (data) => ({
        url: '/vehicle/add',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Vehicles', 'VehiclesCount']
    }),
    updateVehicle: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/vehicle/${id}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Vehicles']
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicle/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vehicles', 'VehiclesCount']
    })
  })
});

export const {
  useGetAllVehiclesQuery,
  useDeleteVehicleMutation,
  usePostVehicleMutation,
  useUpdateVehicleMutation,
  useCountVehiclesQuery,
  useGetVehicleByIdQuery
} = vehicleApiSlice;
