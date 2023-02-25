import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizData: {
      categories: [
        {
          catId: 0,
          catVal: 'Programming',
          levelContain: [0, 1],
        },
        {
          catId: 1,
          catVal: 'Sports',
          levelContain: [0, 1, 2],
        },
        {
          catId: 2,
          catVal: 'Music',
          levelContain: [0],
        },
        {
          catId: 3,
          catVal: 'Dance',
          levelContain: [0, 1, 2],
        },
        {
          catId: 4,
          catVal: 'Mathematics',
          levelContain: [0, 1],
        },
      ],
      levels: [
        {
          levelId: 0,
          levelValue: 'easy',
        },
        {
          levelId: 1,
          levelValue: 'medium',
        },
        {
          levelId: 2,
          levelValue: 'high',
        },
      ],
    },
    usersQuizScore: [],
  },
  reducers: {
    addQuizScore: (state, action) => {
      state.quizData = action.payload;
    },
    addUsersQuizScore: (state, action) => {
      state.usersQuizScore = action.payload;
    },
  },
});

const { reducer } = quizSlice;

const { addQuizScore, addUsersQuizScore } = quizSlice.actions;
export { addQuizScore, addUsersQuizScore };

export default reducer;
