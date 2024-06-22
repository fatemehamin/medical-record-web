import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../services/api";

export const fetchDoctorsAccepted = createAsyncThunk(
  "doctors/fetchDoctorsAccepted",
  async () => {
    const formData = new FormData();

    formData.append("doctors", "");

    const res = await axiosAPI.get("/offline_data/med_doc/", formData);

    return res.data;
  }
);
