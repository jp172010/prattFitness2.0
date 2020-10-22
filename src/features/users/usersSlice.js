import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  goals: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchGoals(state, action) {
      const payload = action.payload;
      console.log(payload)
      const myIndex = state.goals.findIndex(
        (goals) => goals.type === payload.type
      );
      console.log(myIndex)
      if (myIndex == -1) {
        state.goals.push(payload);
      }
    },
    deleteGoal(state, action) {
      const payload = action.payload;
      const myIndex = state.goals.findIndex((goals) => goals.type === payload);
      if (myIndex > -1) {
        state.goals.splice(myIndex, 1);
      }
    },
    userSignIn(state, action) {
      const payload = action.payload;
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].uid === payload.uid) {
          state.users.splice(i, 1, payload);
          return;
        }
      }
      state.users.push(payload);
    },
    userSignOut(state, action) {
      const payload = action.payload;
      const myIndex = state.users.findIndex((users) => users.uid === payload);
      if (myIndex > -1) {
        state.users.splice(myIndex, 1);
        state.goals = [];
      }
    },
  },
  extraReducers: {},
});

export const {
  fetchGoals,
  userSignIn,
  userSignOut,
  pullUserGoals,
  deleteGoal,
} = usersSlice.actions;

export default usersSlice.reducer;
