import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

// Define types for the user and state
export interface User {
  token: string;
}

interface AuthState {
  loading: boolean;
  token: string | undefined;
  error: string | undefined;
  success: boolean;
}

// Initialize userToken from local storage
const user: User | null = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null;

const initialState: AuthState = {
  loading: false, // Access role_name from the role object
  token: user?.token,
  error: undefined,
  success: false
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user'); // Remove user data from local storage
      state.loading = false;

      state.token = undefined;

      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;

      state.success = true;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
