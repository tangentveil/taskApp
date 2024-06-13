import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

// const url = `http://localhost:5000`;

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (authData, thunkAPI) => {
    try {
      const response = await api.signUp(authData);
      // console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (authData, thunkAPI) => {
    try {
      const response = await api.logIn(authData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    currentUser: (state) => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        state.user = userData.user;
        state.token = userData.token;
        state.error = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(payload));
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { logout, currentUser} = authSlice.actions;

export default authSlice.reducer;
