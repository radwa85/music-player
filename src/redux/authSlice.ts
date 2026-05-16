import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../services/gitServices';

interface User {
  email: string;
  name?: string;
  id?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }, { rejectWithValue }) => {
    try {
      const result = await authApi.login(email, password);
      const { token, user } = result;

      await SecureStore.setItemAsync('userToken', token);
      
      // Store remember me preference and email if enabled
      if (rememberMe) {
        await SecureStore.setItemAsync('rememberMe', 'true');
        await SecureStore.setItemAsync('rememberedEmail', email);
      } else {
        await SecureStore.setItemAsync('rememberMe', 'false');
        await SecureStore.deleteItemAsync('rememberedEmail');
      }
      
      return { user, token };
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed. Please try again.';
      console.error('Login thunk error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const restoreAuth = createAsyncThunk('auth/restore', async (_, { rejectWithValue }) => {
  try {
    // Check if user enabled "Remember Me"
    const rememberMe = await SecureStore.getItemAsync('rememberMe');
    
    // Only restore token if Remember Me was enabled
    if (rememberMe === 'true') {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) return { user: null, token: null };
      return { user: null, token };
    }
    
    return { user: null, token: null };
  } catch (err: any) {
    return rejectWithValue(err.message || 'Restore failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Clear all auth-related secure storage
      SecureStore.deleteItemAsync('userToken');
      SecureStore.deleteItemAsync('rememberMe');
      SecureStore.deleteItemAsync('rememberedEmail');
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
