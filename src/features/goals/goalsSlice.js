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
  movementGoals: [],
  circumferenceGoals: [],
  unit: "Metric",
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    bodyFatContentChanged(state, action) {
      const payload = action.payload;
      console.log(payload);
      state.bodyFat.goalBodyFat = payload.goal;
    },
    currentBodyFatChanged(state, action) {
      const payload = action.payload;
      console.log(payload);
      state.bodyFat.currentBodyFat = payload.currentGoal;
    },
    weightContentChanged(state, action) {
      const payload = action.payload;
      console.log(payload);
      state.weight.goalWeight = payload.goal;
    },
    currentWeightChanged(state, action) {
      const payload = action.payload;
      console.log(payload);
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
    movementRepetitionsChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalRepetitions =
          goalTarget.goalRepetitions;
      }
    },
    movementWeightChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalWeight = goalTarget.goalWeight;
      }
    },
    currentRepetitionsChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].currentRepetitions =
          goalTarget.currentRepetitions;
      }
    },
    pullUpWeightChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].currentWeight = goalTarget.currentWeight;
      }
    },
    movementGoalUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals.splice(myIndex, 1);
      }
    },
    weightedChecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].weighted = true;
      }
    },
    weightedUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].weighted = false;
      }
    },
    movementGoalChecked(state, action) {
      const goal = action.payload;
      if (goal.goalName === "Pull Up") {
        let pullUp = {
          goalName: "Pull Up",
          currentRepetitions: goal.currentRepetitions,
          goalRepetitions: goal.goalRepetitions,
        };
        if (goal.weighted) {
          pullUp = {
            goalName: "Pull Up",
            currentRepetitions: goal.currentRepetitions,
            goalRepetitions: goal.goalRepetitions,
            weighted: goal.weighted,
            currentWeight: goal.currentWeight,
            goalWeight: goal.goalWeight,
          };
        }
        state.movementGoals.push(pullUp);
      }
      if (goal.goalName === "Push Up") {
        let pushUp = {
          goalName: "Push Up",
          currentRepetitions: goal.currentRepetitions,
          goalRepetitions: goal.goalRepetitions,
        };
        state.movementGoals.push(pushUp);
      }
      if (goal.goalName === "Sit Up") {
        let sitUp = {
          goalName: "Sit Up",
          currentRepetitions: goal.currentRepetitions,
          goalRepetitions: goal.goalRepetitions,
        };
        state.movementGoals.push(sitUp);
      }
    },
    handleGoalClose(state, action) {
      state.bodyFat = {
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
      state.movementGoals = [];
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
  movementGoalChecked,
  movementGoalUnchecked,
  movementRepetitionsChanged,
  movementWeightChanged,
  currentRepetitionsChanged,
  weightedChecked,
  weightedUnchecked,
  handleGoalClose,
  handleUnitChange,
  pullUpWeightChanged,
} = goalsSlice.actions;

export default goalsSlice.reducer;

export const circumferenceGoals = (state) => state.circumferenceGoals;
