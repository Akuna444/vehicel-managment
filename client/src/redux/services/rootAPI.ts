import { backendUrl } from '@/lib/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';

const addTokenToRequest = async (headers, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers, { getState }) =>
      addTokenToRequest(headers, { getState })
  });

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Vehicles', 'OneVehicles', 'VehiclesCount'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  refetchOnFocus: true
});

export default apiSlice;
