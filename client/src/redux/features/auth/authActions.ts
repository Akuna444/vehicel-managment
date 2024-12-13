import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './authSlice';

// Define types for login credentials and response data
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the async thunk
export const userLogin = createAsyncThunk<
  User, // Return type
  LoginCredentials, // Thunk argument type
  { rejectValue: string } // rejectWithValue type
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    // Configure header's Content-Type as JSON
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data, status } = await axios.post<User>(
      '/auth/login',
      { email, password },
      config
    );

    if (status >= 200 && status < 300) {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    }

    throw new Error('Failed to login!');
  } catch (error) {
    console.log(error, 'this is eerrrrrrrr');
    if (error instanceof AxiosError) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('An unexpected error occurred.');
      }
    }

    // Handle non-Axios errors
    return rejectWithValue('An unexpected error occurred.');
  }
});
