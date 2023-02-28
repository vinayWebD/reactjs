import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('apiFetch/posts', async () => {
  let response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
});
