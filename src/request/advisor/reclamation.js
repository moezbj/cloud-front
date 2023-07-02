import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllReclamation = () =>
  axiosGet("/reclamations", { sendToken: false });
export const getReclamation = (id) =>
  axiosGet(`/reclamations/${id}`, { sendToken: false });
export const addReclamation = (data) =>
  axiosPost(`/reclamations`, { sendToken: false, data });
export const updateReclamation = (id, data) =>
  axiosPatch(`/reclamations/${id}`, { sendToken: false, data });
export const deleteReclamation = (id) =>
  axiosDelete(`/reclamations/${id}`, { sendToken: false });
