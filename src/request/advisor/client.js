import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllClients = (params) =>
  axiosGet("/clients", { sendToken: false, params });
export const getClient = (id) =>
  axiosGet(`/clients/${id}`, { sendToken: false });
export const addClient = (data) =>
  axiosPost(`/clients`, { sendToken: false, data });
export const updateClient = (id, data) =>
  axiosPatch(`/clients/${id}`, { sendToken: false, data });
export const deleteClient = (id) =>
  axiosDelete(`/clients/${id}`, { sendToken: false });
