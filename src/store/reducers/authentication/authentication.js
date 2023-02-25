import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    usersList: [
      {
        id: 1,
        userName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        type: 'admin',
        status: 'approved',
      },
    ],
    userInfo: null,
  },
  reducers: {
    addUserData: (state, action) => {
      state.usersList = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

const { reducer } = authenticationSlice;

const { addUserData, updateUserInfo } = authenticationSlice.actions;
export { addUserData, updateUserInfo };

export default reducer;
