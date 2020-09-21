import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circumferenceGoals: [],
  unit: "Metric",
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    circumferenceContentChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.circumferenceGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.circumferenceGoals[myIndex].goal = goalTarget.goal;
      }
    },
    circumferenceGoalChecked(state, action) {
      const goal = action.payload;
      state.circumferenceGoals.push(goal);
    },
    circumferenceGoalUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.circumferenceGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.circumferenceGoals.splice(myIndex, 1);
      }
    },
    handleGoalClose(state, action) {
      state.circumferenceGoals = [];
    },
    handleUnitChange(state, action) {
      const payload = action.payload;
      state.unit = payload;
    },
    saveCircumferenceGoal(state, action) {
      const payload = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  circumferenceGoalChecked,
  circumferenceGoalUnchecked,
  circumferenceContentChanged,
  handleGoalClose,
  handleUnitChange,
} = goalsSlice.actions;

export default goalsSlice.reducer;

export const circumferenceGoals = (state) => state.circumferenceGoals;
