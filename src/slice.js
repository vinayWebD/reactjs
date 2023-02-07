import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    usersList: [],
    userInfo: null,
  },
  reducers: {
    addUserData: (state, action) => {
      state.usersList.push(action.payload);
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    addTodolistData: (state, action) => {
      let todo = state.usersList.find((obj) => obj.userName == state.userInfo.userName);
      todo.todolistData = action.payload;
    },
  },
});

const { reducer } = counterSlice;

const usersList = (state) => state.usersList;
const userInfo = (state) => state.userInfo;

const { addUserData, updateUserInfo, addTodolistData } = counterSlice.actions;
export { reducer, counterSlice, addUserData, updateUserInfo, addTodolistData, usersList, userInfo };

export default reducer;
