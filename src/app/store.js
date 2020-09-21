import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    goals: goalsReducer,
  },
});
