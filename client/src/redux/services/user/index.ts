import apiSlice from '@/redux/services/rootAPI';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Vehicles']
    })
  })
});

export const { useUserSignUpMutation } = userApiSlice;
