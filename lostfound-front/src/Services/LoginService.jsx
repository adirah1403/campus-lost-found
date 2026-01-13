import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:9595/lostfound";

export const registerNewUser = (user) =>
  axios.post(`${BASE_URL}/register`, user);

export const validateUser = (username, password) =>
  axios.post(`${BASE_URL}/login`, { username, password });

export const getUserDetails = () =>
  axios.get(`${BASE_URL}/me`);

export const getRole = () =>
  axios.get(`${BASE_URL}/role`);

export const logoutUser = () =>
  axios.post(`${BASE_URL}/logout`);

export const getUserId = () =>
  axios.get(`${BASE_URL}/user`);

export const getAllStudents = () =>
  axios.get(`${BASE_URL}/student`);

export const deleteStudent = (username) =>
  axios.delete(`${BASE_URL}/login/${username}`);
