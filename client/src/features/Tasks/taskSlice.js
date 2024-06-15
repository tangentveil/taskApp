import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
  isTaskCreating: false,
  isTaskCreated: false,
  isTaskCompleted: false,
  isTaskInProgress: false,
  isTaskDeleted: false,
  taskProgress: null,
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (userId, thunkAPI) => {
    try {
      const response = await api.getTasks(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ userId, taskData }, thunkAPI) => {
    try {
      const response = await api.createTask(userId, taskData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await api.deleteTask(taskId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updateData }, thunkAPI) => {
    try {
      const response = await api.updateTask(taskId, updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    clearTaskError: (state) => {
      state.error = null;
      state.isTaskCreating = false;
      state.isTaskCreated = false;
      state.isTaskCompleted = false;
      state.isTaskDeleted = false;
      state.taskProgress = "in progress";
    },
    statusChange: (state, {payload}) => {
      state.taskProgress = payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.isLoading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      .addCase(createTask.pending, (state) => {
        state.isTaskCreating = true;
        state.isTaskCreated = false
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
        state.isTaskCreating = false;
        state.isTaskCreated = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isTaskCreating = false;
        state.isTaskCreated = false;
        state.error = action;
      })
      .addCase(deleteTask.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
        state.isTaskDeleted = false;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter((task) => task._id !== payload._id);
        state.isLoading = false;
        state.error = null;
        state.isTaskDeleted = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        state.isTaskDeleted = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.isTaskCompleted = false;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        );
        state.isTaskCompleted = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isTaskCompleted = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError, statusChange } = taskSlice.actions;
export default taskSlice.reducer;
