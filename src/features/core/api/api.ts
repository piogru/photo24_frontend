import axios, { AxiosInstance } from "axios";
import AppConstants from "../constants/appConstants";

const api: AxiosInstance = axios.create({
  baseURL: AppConstants.apiUrl,
  withCredentials: true,
});

export default api;
