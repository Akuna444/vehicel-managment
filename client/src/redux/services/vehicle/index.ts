import apiSlice from '@/redux/services/rootAPI';

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: () => ({
        url: `/vehicle/all`
      }),
      providesTags: ['Vehicles']
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
      invalidatesTags: ['Vehicles']
    }),
    updateVehicle: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/vehicle/update/${id}`,
          method: 'PATCH',
          body: data
        };
      },
      invalidatesTags: ['Vehicles']
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicle/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vehicles']
    })
  })
});

export const {
  useGetAllVehiclesQuery,
  useDeleteVehicleMutation,
  usePostVehicleMutation,
  useUpdateVehicleMutation,
  useCountVehiclesQuery
} = vehicleApiSlice;
