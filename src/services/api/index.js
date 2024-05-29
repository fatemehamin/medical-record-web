import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8000/";
// const baseURL = "https://biodoc.smartzist.ir";

// const csrftoken = Cookies.get("csrftoken");

const axiosAPI = axios.create({
  baseURL,
  // headers: { "X-CSRFToken": csrftoken },
});

axiosAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const formattedError = {
      status: error.response?.status,
      code: error.response?.data.errors,
      message: error.response?.data.message,
      messageServer: error.message,
    };
    return Promise.reject(formattedError);
  }
);

export default axiosAPI;
