import { createAsyncThunk } from "@reduxjs/toolkit";
import * as crypto from "../../utils/crypto";
import axiosAPI from "../../services/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);

      await axiosAPI.post("/login/", formData);

      crypto.saveSecureData("auth", { username, password });

      return username;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password, rePassword }, { rejectWithValue }) => {
    try {
      const formDate = new FormData();

      formDate.append("username", username);
      formDate.append("password1", password);
      formDate.append("password2", rePassword);
      formDate.append("email", email);

      await axiosAPI.post("/signup/", formDate);

      crypto.saveSecureData("auth", { username, password });
      return { username, email };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
