import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    usersList: [
      {
        id: 1,
        userName: 'superAdmin',
        email: 'superAdmin@yopmail.com',
        password: 'superadmin#123',
        type: 'superAdmin',
        status: 'approved',
      },
      {
        id: 2,
        userName: 'admin',
        email: 'admin@yopmail.com',
        password: 'admin#123',
        type: 'admin',
        status: 'approved',
      },
      {
        id: 3,
        userName: 'testUser',
        email: 'testUser@yopmail.com',
        password: 'test#123',
        type: 'user',
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
