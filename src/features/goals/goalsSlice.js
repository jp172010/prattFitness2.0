import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weight: {
    currentWeight: undefined,
    goalWeight: undefined,
    goalName: "Weight",
  },
  bodyFat: {
    currentBodyFat: undefined,
    goalBodyFat: undefined,
    goalName: "Body Fat",
  },
  circumferenceGoals: [],
  unit: "Metric",
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    bodyFatContentChanged(state, action) {
      const payload = action.payload;
      console.log(payload)
      state.bodyFat.goalBodyFat = payload.goal;
    },
    currentBodyFatChanged(state, action) {
      const payload = action.payload;
      console.log(payload)
      state.bodyFat.currentBodyFat = payload.currentGoal;
    },
    weightContentChanged(state, action) {
      const payload = action.payload;
      console.log(payload)
      state.weight.goalWeight = payload.goal;
    },
    currentWeightChanged(state, action) {
      const payload = action.payload;
      console.log(payload)
      state.weight.currentWeight = payload.currentGoal;
    },
    circumferenceContentChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.circumferenceGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.circumferenceGoals[myIndex].goal = goalTarget.goal;
      }
    },
    currentCircumferenceChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.circumferenceGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.circumferenceGoals[myIndex].currentGoal = goalTarget.currentGoal;
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
      state.bodyFat ={
        currentBodyFat: undefined,
        goalBodyFat: undefined,
        goalName: "Body Fat",
      };
      state.weight = {
        currentWeight: undefined,
        goalWeight: undefined,
        goalName: "Weight",
      };
      state.circumferenceGoals = [];
    },
    handleUnitChange(state, action) {
      const payload = action.payload;
      state.unit = payload;
    },
  },
  extraReducers: {},
});

export const {
  bodyFatContentChanged,
  currentBodyFatChanged,
  weightContentChanged,
  currentWeightChanged,
  circumferenceGoalChecked,
  circumferenceGoalUnchecked,
  circumferenceContentChanged,
  currentCircumferenceChanged,
  handleGoalClose,
  handleUnitChange,
} = goalsSlice.actions;

export default goalsSlice.reducer;

export const circumferenceGoals = (state) => state.circumferenceGoals;
