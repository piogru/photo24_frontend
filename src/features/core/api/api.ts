import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/appConstants";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
