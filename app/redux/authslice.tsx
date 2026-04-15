import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/gitservices';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null; 
}

export const loginUser = createAsyncThunk<
  LoginResponse,          
  LoginCredentials,       
  { rejectValue: string } 
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'حدث خطأ');
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
    state.error = action.payload ? String(action.payload) : 'Unknown error';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;