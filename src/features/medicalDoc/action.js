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

    return { id: res.data.id, tag, name, date };
  }
);

export const addOCR = createAsyncThunk(
  "medicalDoc/addMedicalDocsOCR",
  async ({ file, url, tag, name, date }) => {
    const formData = new FormData();

    formData.append("result_file", file);
    formData.append("result_file_link", url);
    formData.append("tag", tag);
    formData.append("test_name", name);
    formData.append("date_field", date);
    formData.append("upload_ocr", "");

    const res = await axiosAPI.post("offline_data/upload_test/", formData);

    return {
      id: res.data.id,
      filetable: res.data.file_tables,
      tag,
      name,
      date,
    };
  }
);

export const editOCR = createAsyncThunk(
  "medicalDoc/editOCR",
  async ({ newTables, id }) => {
    await axiosAPI.post("/offline_data/ocr_edit/", {
      id,
      newTables,
      confirm: "",
    });
    return newTables;
  }
);

export const removeOCR = createAsyncThunk(
  "medicalDoc/removeOCR",
  async (id) => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("cancel", "");

    await axiosAPI.post("/offline_data/ocr_edit/", formData);
  }
);

export const downloadOCR = createAsyncThunk(
  "medicalDoc/downloadOCR",
  async ({ id, fileName }) => {
    const res = await axiosAPI.get(
      `offline_data/med_doc/?download_csv&file_id=${id}`,
      { responseType: "text/csv" }
    );

    const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const filename = `${fileName}.csv`;

    link.setAttribute("download", filename); // Set the desired filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
);

export const editMedicalDocs = createAsyncThunk(
  "medicalDoc/editMedicalDocs",
  async ({ id, name, date, tag }) => {
    const formData = new FormData();

    formData.append("file_id", id);
    formData.append("test_name", name);
    formData.append("date_field", date);
    formData.append("tag", tag);
    formData.append("doc_edit", "");

    await axiosAPI.post("offline_data/med_doc/", formData);
    return { id, name, date, tag };
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

export const shareMedicalDocs = createAsyncThunk(
  "medicalDoc/shareMedicalDocs",
  async ({ data, email }) => {
    const formData = new FormData();

    formData.append("data_id", data);
    formData.append("user_id", email);
    formData.append("grant", "");

    await axiosAPI.post("offline_data/med_doc/", formData);
  }
);

export const fetchItemMedicalDoc = createAsyncThunk(
  "medicalDoc/fetchItemMedicalDoc",
  async (id) => {
    const res = await axiosAPI.get(`offline_data/med_doc/?view&file_id=${id}`);
    return res.data;
  }
);

export const downloadFileMedicalDocs = createAsyncThunk(
  "medicalDoc/downloadMedicalDocs",
  async (id) => {
    const res = await axiosAPI.get(
      `offline_data/med_doc/?download&file_id=${id}`
      // { responseType: "blob" } //For Download Binarry Data need this config
    );

    // Convert the base64 string to a Blob
    const binaryData = atob(res.data.file_data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: "application/octet-stream" });

    // For Download Binarry Data do not need up config just need down config
    // const blob = new Blob([res.data], { type: res.headers["content-type"] });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const filename = res.data.name + res.data.type;

    link.setAttribute("download", filename); // Set the desired filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
);

export const addHighlight = createAsyncThunk(
  "medicalDoc/addHighlight",
  async ({ id, highlight, name, username, avatar }) => {
    const formData = new FormData();

    formData.append("file_id", id);
    formData.append("content", highlight);
    formData.append("add_highlight", "");

    const res = await axiosAPI.post("offline_data/med_doc/", formData);

    return {
      id: res.data.id,
      content: highlight,
      date: res.data.date,
      name,
      username,
      avatar,
    };
  }
);

export const deleteHighlight = createAsyncThunk(
  "medicalDoc/deleteHighlight",
  async ({ id, highlight_id }) => {
    const formData = new FormData();

    formData.append("file_id", id);
    formData.append("highlight_id", highlight_id);
    formData.append("remove_highlight", "");

    await axiosAPI.post("offline_data/med_doc/", formData);

    return highlight_id;
  }
);
