import { createSlice } from "@reduxjs/toolkit";
import {
  addHighlight,
  addMedicalDocs,
  addOCR,
  deleteHighlight,
  deleteMedicalDocs,
  downloadFileMedicalDocs,
  downloadOCR,
  editMedicalDocs,
  editOCR,
  fetchItemMedicalDoc,
  fetchMedicalDocs,
  removeOCR,
  shareMedicalDocs,
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
  currentDoc: null,
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
        const dateDoc = new Date(doc.date);
        return name
          ? doc.name === name
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
      state.currentDoc = null;
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
    builder.addCase(addOCR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOCR.fulfilled, (state, action) => {
      if (!state.tags.find((tag) => tag === action.payload.tag)) {
        state.tags.push(action.payload.tag);
      }
      state.currentDoc = action.payload;
      state.docs.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addOCR.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(editOCR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editOCR.fulfilled, (state, action) => {
      state.currentDoc.filetable = action.payload;
      state.isLoading = false;
    });
    builder.addCase(editOCR.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(removeOCR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeOCR.fulfilled, (state) => {
      state.currentDoc.filetable = null;
      state.isLoading = false;
    });
    builder.addCase(removeOCR.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(downloadOCR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(downloadOCR.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(downloadOCR.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(editMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editMedicalDocs.fulfilled, (state, action) => {
      state.docs = state.docs.map((doc) =>
        doc.id === action.payload.id ? action.payload : doc
      );
      state.currentDoc = { ...state.currentDoc, ...action.payload };
      state.isLoading = false;
    });
    builder.addCase(editMedicalDocs.rejected, (state, action) => {
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
    builder.addCase(shareMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(shareMedicalDocs.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(shareMedicalDocs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchItemMedicalDoc.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItemMedicalDoc.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentDoc = action.payload;
    });
    builder.addCase(fetchItemMedicalDoc.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(downloadFileMedicalDocs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(downloadFileMedicalDocs.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(downloadFileMedicalDocs.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addHighlight.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addHighlight.fulfilled, (state, action) => {
      state.currentDoc.highlights.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addHighlight.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteHighlight.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteHighlight.fulfilled, (state, action) => {
      state.currentDoc.highlights = state.currentDoc.highlights.filter(
        (h) => h.id != action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(deleteHighlight.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { searchDocs } = medicalDocSlice.actions;
export default medicalDocSlice.reducer;
