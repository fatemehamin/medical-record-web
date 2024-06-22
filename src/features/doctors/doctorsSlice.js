import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorsAccepted } from "./action";

const initialState = {
  doctorsAccepted: [],
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDoctorsAccepted.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDoctorsAccepted.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctorsAccepted = action.payload.doctors;
      state.error = null;
    });
    builder.addCase(fetchDoctorsAccepted.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default doctorsSlice.reducer;
