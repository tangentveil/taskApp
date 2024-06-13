import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
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

  reducers: {},

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
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.tasks = state.tasks.filter((task) => task._id !== payload._id);
        state.isLoading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateTask.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        );
        state.isLoading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default taskSlice.reducer;
