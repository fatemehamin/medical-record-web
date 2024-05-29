import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./action";

const initialState = {
  username: "",
  email: "",
  isAuthentication: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.isAuthentication = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "An unexpected error occurred";
    });
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.code || "An unexpected error occurred";
    });
  },
});

export default authSlice.reducer;
