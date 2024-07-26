import { apiBaseUrl } from "@/constants";
import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  withXSRFToken: true,
});
