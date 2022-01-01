import axios from "axios";

let token = localStorage.getItem("userToken");

export const authServer = axios.create({
  baseURL: "/api",
  headers: { Authorization: `Bearer ${token}` }
});
