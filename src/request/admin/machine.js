import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllMachines = () => axiosGet("/machines", { sendToken: false });
export const getMachine = (id) =>
  axiosGet(`/machines/${id}`, { sendToken: false });
export const addMachine = (data) =>
  axiosPost(`/machines`, { sendToken: false, data });
export const updateMachine = (id, data) =>
  axiosPatch(`/machines/${id}`, { sendToken: false, data });
export const deleteMachine = (id) =>
  axiosDelete(`/machines/${id}`, { sendToken: false });
