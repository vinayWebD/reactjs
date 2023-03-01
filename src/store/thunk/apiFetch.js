import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('apiFetch/users', async () => {
  let response = await axios.get('https://dummyjson.com/users');
  return response.data.users;
});
