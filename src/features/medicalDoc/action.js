import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../services/api";

export const fetchMedicalDocs = createAsyncThunk(
  "medicalDoc/fetchMedicalDocs",
  async () => {
    const res = await axiosAPI.get("offline_data/med_doc/");
    return res.data;
  }
);

export const addMedicalDocs = createAsyncThunk(
  "medicalDoc/addMedicalDocs",
  async ({ file, url, tag, name, date }) => {
    const formData = new FormData();

    formData.append("result_file", file);
    formData.append("result_file_link", url);
    formData.append("tag", tag);
    formData.append("test_name", name);
    formData.append("date_field", date);
    formData.append("upload", "");

    const res = await axiosAPI.post("offline_data/upload_test/", formData);

    return { id: res.data.id, tag, test_name: name, result_date: date };
  }
);

export const deleteMedicalDocs = createAsyncThunk(
  "medicalDoc/deleteMedicalDocs",
  async (result_id) => {
    const formData = new FormData();

    formData.append("result_id", result_id);
    formData.append("delete", "");

    await axiosAPI.post("offline_data/med_doc/", formData);
    return { result_id };
  }
);
