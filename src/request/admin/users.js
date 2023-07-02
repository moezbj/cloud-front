import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllUsers = () => axiosGet("/users", { sendToken: false });
export const getUser = (id) => axiosGet(`/users/${id}`, { sendToken: false });
export const addUser = (data) =>
  axiosPost(`/users`, { sendToken: false, data });
export const updateUser = (id, data) =>
  axiosPatch(`/users/${id}`, { sendToken: false, data });
export const deleteUser = (id) =>
  axiosDelete(`/users/${id}`, { sendToken: false });
