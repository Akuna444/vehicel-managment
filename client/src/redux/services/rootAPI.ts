import { backendUrl } from '@/lib/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const addTokenToRequest = async (headers, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Vehicles', 'VehiclesCount'],
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers, { getState }) => {
      return addTokenToRequest(headers, { getState });
    }
  }),
  endpoints: (builder) => ({}),
  // this func will refetch the datas when page focused
  refetchOnFocus: true
});

// the use hook below is automaticlly created by reduk toolkit, you just can see the template
// useGetAllTodosQuery is for getAllTodos above, and usePostTodoMutation is for postTodo, etc.
export default apiSlice;
