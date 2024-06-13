import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice.js";
import taskReducer from './features/Tasks/taskSlice.js'
import modalReducer from './features/modal/modalSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    modal: modalReducer,
  },
});
