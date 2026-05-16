import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../types/track';
import { RootState } from '../index';
import { searchService } from '../../services/searchService';

interface SearchState {
  query: string;
  results: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      throw new Error('Not authenticated. Please login again.');
    }
    return await searchService.searchTracks(query, token);
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred during search';
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
