import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllRams = () => axiosGet("/rams", { sendToken: false });
export const getRam = (id) => axiosGet(`/rams/${id}`, { sendToken: false });
export const addRam = (data) => axiosPost(`/rams`, { sendToken: false, data });
export const updateRam = (id, data) =>
  axiosPatch(`/rams/${id}`, { sendToken: false, data });
export const deleteRam = (id) =>
  axiosDelete(`/rams/${id}`, { sendToken: false });
