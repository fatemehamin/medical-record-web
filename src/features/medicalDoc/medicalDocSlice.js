import { createSlice } from "@reduxjs/toolkit";
import {
  addMedicalDocs,
  deleteMedicalDocs,
  fetchMedicalDocs,
  fetchOCR,
} from "./action";

const initialState = {
  AllTags: [
    { key: "blood", value: "Blood test" },
    { key: "urine", value: "Urine test" },
    { key: "stool", value: "Stool test" },
    { key: "xray", value: "X-ray" },
    { key: "ctscan", value: "CT scan" },
    { key: "mri", value: "MRI" },
    { key: "ultrasound", value: "Ultrasound" },
    { key: "ecg", value: "Electrocardiogram (ECG)" },
    { key: "eeg", value: "Electroencephalogram (EEG)" },
    { key: "emg", value: "Electromyography (EMG)" },
    { key: "other", value: "Other" },
  ],
  docs: [],
  tags: [],
  tables: [],
  isLoading: false,
  error: null,
};

const medicalDocSlice = createSlice({
  name: "medicalDoc",
  initialState,
  reducers: {
    searchDocs: (state, action) => {
      const { name, startDate, endDate } = action.payload;

      const newDocs = state.docs.filter((doc) => {
        const dateDoc = new Date(doc.result_date);
        return name
          ? doc.test_name === name
          : startDate.$d < dateDoc && dateDoc < endDate.$d;
      });

      const newTags = newDocs
        .map((doc) => doc.tag)
        .filter((tag, index, array) => array.indexOf(tag) === index);

      state.docs = newDocs;
      state.tags = newTags;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMedicalDocs.fulfilled, (state, action) => {
      const { tags, files } = action.payload;
      state.docs = files;
      state.tags = tags;
      state.isLoading = false;
    });
    builder.addCase(fetchMedicalDocs.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMedicalDocs.fulfilled, (state, action) => {
      if (!state.tags.find((tag) => tag === action.payload.tag)) {
        state.tags.push(action.payload.tag);
      }
      state.docs.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addMedicalDocs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMedicalDocs.fulfilled, (state, action) => {
      const { result_id } = action.payload;

      const newDocs = state.docs.filter(
        (doc) => !result_id.find((id) => id === doc.id)
      );

      const filterTags = (tag) => newDocs.find((doc) => doc.tag === tag);

      state.docs = newDocs;
      state.tags = state.tags.filter(filterTags);

      state.isLoading = false;
    });
    builder.addCase(deleteMedicalDocs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchOCR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOCR.fulfilled, (state, action) => {
      state.tables = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOCR.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { searchDocs } = medicalDocSlice.actions;
export default medicalDocSlice.reducer;
