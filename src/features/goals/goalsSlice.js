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
  dietGoals: [],
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
    goalTimeChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalTime = goalTarget.goalTime;
      }
    },
    goalDistanceChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalDistance = goalTarget.goalDistance;
      }
    },
    currentTimeChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].currentTime = goalTarget.currentTime;
      }
    },
    movementHeightChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalHeight = goalTarget.goalHeight;
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
    current1RMChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].current1RM = goalTarget.current1RM;
      }
    },
    goal1RMChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goal1RM = goalTarget.goal1RM;
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
    doubleGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalDouble = goalTarget.goalDouble;
      }
    },
    doubleRepsChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].doubleReps = goalTarget.doubleReps;
      }
    },
    hSPURepsChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].hSPUReps = goalTarget.hSPUReps;
      }
    },
    hSPUGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].goalHSPU = goalTarget.goalHSPU;
      }
    },
    currentHeightChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].currentHeight = goalTarget.currentHeight;
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
    weightChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].currentWeight = goalTarget.currentWeight;
      }
    },
    dietGoalUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.dietGoals.splice(myIndex, 1);
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
    doublesChecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].double = true;
      }
    },
    doublesUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].double = false;
      }
    },
    hSPUChecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].hSPU = true;
      }
    },
    doublesUnchecked(state, action) {
      const payload = action.payload;
      const myIndex = state.movementGoals.findIndex(
        (goal) => goal.goalName === payload
      );
      if (myIndex > -1) {
        state.movementGoals[myIndex].hSPU = false;
      }
    },
    movementGoalChecked(state, action) {
      const goal = action.payload;
      if (goal.goalName === "Handstand") {
        let movement = {
          goalName: goal.goalName,
          currentTime: goal.currentTime,
          goalTime: goal.goalTime,
        };
        if (goal.hSPU) {
          movement = {
            goalName: goal.goalName,
            currentTime: goal.currentTime,
            goalTime: goal.goalTime,
            hSPU: goal.hSPU,
            hSPUReps: goal.hSPUReps,
            goalHSPU: goal.goalHSPU,
          };
        }
        state.movementGoals.push(movement);
      }
      if (goal.goalName === "Pull Up" || goal.goalName === "Jump Rope") {
        let movement = {
          goalName: goal.goalName,
          currentRepetitions: goal.currentRepetitions,
          goalRepetitions: goal.goalRepetitions,
        };
        if (goal.double) {
          movement = {
            goalName: goal.goalName,
            currentRepetitions: goal.currentRepetitions,
            goalRepetitions: goal.goalRepetitions,
            double: goal.double,
            doubleReps: goal.doubleReps,
            goalDouble: goal.goalDouble,
          };
        }
        if (goal.weighted) {
          movement = {
            goalName: goal.goalName,
            currentRepetitions: goal.currentRepetitions,
            goalRepetitions: goal.goalRepetitions,
            weighted: goal.weighted,
            currentWeight: goal.currentWeight,
            goalWeight: goal.goalWeight,
          };
        }
        state.movementGoals.push(movement);
      }
      if (goal.goalName === "Push Up" || goal.goalName === "Sit Up") {
        let movement = {
          goalName: goal.goalName,
          currentRepetitions: goal.currentRepetitions,
          goalRepetitions: goal.goalRepetitions,
        };
        state.movementGoals.push(movement);
      }
      if (
        goal.goalName === "Squat" ||
        goal.goalName === "Bench Press" ||
        goal.goalName === "Deadlift" ||
        goal.goalName === "Snatch" ||
        goal.goalName === "Clean and Jerk" ||
        goal.goalName === "Turkish Get Up"
      ) {
        let movement = {
          goalName: goal.goalName,
          current1RM: goal.current1RM,
          goal1RM: goal.goal1RM,
        };
        state.movementGoals.push(movement);
      }
      if (goal.goalName === "Box Jump") {
        let movement = {
          goalName: goal.goalName,
          currentHeight: goal.currentHeight,
          goalHeight: goal.goalHeight,
        };
        state.movementGoals.push(movement);
      }
      if (
        goal.goalName === "Running" ||
        goal.goalName === "Rowing" ||
        goal.goalName === "Cycling" ||
        goal.goalName === "Swimming"
      ) {
        let movement = {
          goalName: goal.goalName,
          goalDistance: goal.goalDistance,
          currentTime: goal.currentTime,
          goalTime: goal.goalTime,
        };
        state.movementGoals.push(movement);
      }
    },
    dietGoalChecked(state, action) {
      const goal = action.payload;
      if (goal.goalName === "Macros") {
        let diet = {
          goalName: goal.goalName,
          fatGoal: goal.fatGoal,
          carbGoal: goal.carbGoal,
          proteinGoal: goal.proteinGoal,
        };
        state.dietGoals.push(diet);
      }
      if (goal.goalName === "Calories") {
        let diet = {
          goalName: goal.goalName,
          calorieGoal: goal.calorieGoal,
        };
        state.dietGoals.push(diet);
      }
    },
    calorieGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.dietGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.dietGoals[myIndex].calorieGoal = goalTarget.calorieGoal;
      }
    },
    fatGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.dietGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.dietGoals[myIndex].fatGoal = goalTarget.fatGoal;
      }
    },
    carbGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.dietGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.dietGoals[myIndex].carbGoal = goalTarget.carbGoal;
      }
    },
    proteinGoalChanged(state, action) {
      const goalTarget = action.payload;
      const myIndex = state.dietGoals.findIndex(
        (goal) => goal.goalName === goalTarget.goalName
      );
      if (myIndex > -1) {
        state.dietGoals[myIndex].proteinGoal = goalTarget.proteinGoal;
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
      state.dietGoals = [];
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
  weightChanged,
  goal1RMChanged,
  current1RMChanged,
  movementHeightChanged,
  currentHeightChanged,
  doubleRepsChanged,
  doubleGoalChanged,
  doublesChecked,
  doublesUnchecked,
  hSPURepsChanged,
  hSPUGoalChanged,
  hSPUChecked,
  hSPUUnchecked,
  goalDistanceChanged,
  currentTimeChanged,
  goalTimeChanged,
  dietGoalChecked,
  dietGoalUnchecked,
  calorieGoalChanged,
  fatGoalChanged,
  carbGoalChanged,
  proteinGoalChanged,
} = goalsSlice.actions;

export default goalsSlice.reducer;

export const circumferenceGoals = (state) => state.circumferenceGoals;
