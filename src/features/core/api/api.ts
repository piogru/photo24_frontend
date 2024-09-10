import axios, { AxiosInstance } from "axios";
import { apiURL } from "../constants/appConstants";

const api: AxiosInstance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

export default api;
