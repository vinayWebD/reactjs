import { createSlice } from '@reduxjs/toolkit';

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: {
    userstodoListData: [],
  },
  reducers: {
    addUsertodoListData: (state, action) => {
      state.userstodoListData = action.payload;
    },
  },
});

const { reducer } = todolistsSlice;

const { addUsertodoListData } = todolistsSlice.actions;
export { addUsertodoListData };

export default reducer;
