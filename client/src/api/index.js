import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000",
   baseURL: "https://taskapp-server-0b8q.onrender.com",
});
   
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const logIn = (authData) => API.post("/auth/login", authData);
export const signUp = (authData) => API.post("/auth/signup", authData);

export const createTask = (id, taskData) => API.post(`/tasks/create/${id}`, taskData);
export const getTasks = (id) => API.get(`/tasks/get/${id}`);
export const updateTask = (taskId, updateData) => API.put(`/tasks/update/${taskId}`, updateData);
export const deleteTask = (taskId) => API.delete(`/tasks/delete/${taskId}`);
