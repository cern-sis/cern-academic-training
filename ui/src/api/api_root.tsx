import axios from "axios";

const api = axios.create({
  baseURL: `/api/v1/`,
});

export function getApiRoot() {
  return api;
}
