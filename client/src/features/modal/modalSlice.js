import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  taskData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.taskData = payload;
    },

    closeModal: (state, { payload }) => {
      state.isOpen = false;
      state.taskData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
