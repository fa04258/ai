import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // your backend URL

export const register = async (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};
