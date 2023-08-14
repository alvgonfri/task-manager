import axios from "axios";

const API_URL = "http://127.0.0.1:4000/api";

export const registerRequest = (user) =>
  axios.post(`${API_URL}/register`, user);

export const loginRequest = (user) => axios.post(`${API_URL}/login`, user);
