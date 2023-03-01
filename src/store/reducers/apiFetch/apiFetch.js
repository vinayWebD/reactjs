import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../../thunk/apiFetch';

const apiFetchSlice = createSlice({
  name: 'apiFetch',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default apiFetchSlice.reducer;
