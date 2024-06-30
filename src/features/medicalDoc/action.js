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

export const editMedicalDocs = createAsyncThunk(
  "medicalDoc/editMedicalDocs",
  async ({ file_id, test_name, date_field, tag }) => {
    const formData = new FormData();

    formData.append("file_id", file_id);
    formData.append("test_name", test_name);
    formData.append("date_field", date_field);
    formData.append("tag", tag);
    formData.append("doc_edit", "");

    await axiosAPI.post("offline_data/med_doc/", formData);
    return { file_id, test_name, date_field, tag };
  }
);

export const shareMedicalDocs = createAsyncThunk(
  "medicalDoc/shareMedicalDocs",
  async ({ data, id }) => {
    const formData = new FormData();

    formData.append("data_id", data);
    formData.append("user_id", id);
    formData.append("grant", "");

    await axiosAPI.post("offline_data/med_doc/", formData);

    return { id, data };
  }
);

export const fetchOCR = createAsyncThunk("medicalDoc/fetchOCR", async () => {
  const res = await axiosAPI.get("offline_data/med_doc/");
  return res.data;
});

export const fetchItemMedicalDoc = createAsyncThunk(
  "medicalDoc/fetchItemMedicalDoc",
  async (id) => {
    console.log(id);
    const res = await axiosAPI.get(`offline_data/med_doc/?view&file_id=${id}`);
    return res.data;
  }
);

export const downloadMedicalDocs = createAsyncThunk(
  "medicalDoc/downloadMedicalDocs",
  async (id) => {
    const res = await axiosAPI.get(
      `offline_data/med_doc/?download&file_id=${id}`,
      { responseType: "blob" }
    );
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // const mimeTypeToExtension = {
    //   "image/jpeg": ".jpg",
    //   "image/png": ".png",
    //   "application/pdf": ".pdf",
    // };

    // const contentTypeString = res.headers["content-type"];
    // const contentDispositionString = res.headers["Content-Disposition"];
    const contentDispositionString =
      'attachment; filename="test_file/sample_IKjfa3H.png"';
    // const contentType = contentTypeString.match(/['"]([^'"]+)['"]/)[1];
    const filename = contentDispositionString.match(
      /filename="(?:[^/]+\/)?([^"]+)"/
    )[1];

    // const extension = mimeTypeToExtension[contentType] || "";

    // const filename = `file${extension}`;

    link.setAttribute("download", filename); // Set the desired filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
);
