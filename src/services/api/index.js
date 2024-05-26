import axios from "axios";

const baseURL = "https://biodoc.smartzist.ir";

const axiosAPI = axios.create({ baseURL });

export default axiosAPI;
