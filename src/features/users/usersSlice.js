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
      state.goals.push(payload);
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
} = usersSlice.actions;

export default usersSlice.reducer;
