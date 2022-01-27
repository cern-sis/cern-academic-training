import axios from "axios";

const token = `http://localhost:8000/admin/authtoken/tokenproxy/1`;

const api = axios.create({
  baseURL: `http://localhost:8000/api/v1/`,
  timeout: 1000,
  withCredentials: false,
  headers: { Authorization: "Bearer " + token },
});

export function getApiRoot() {
  return api;
}
