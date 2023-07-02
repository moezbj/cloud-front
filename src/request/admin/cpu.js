import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllCpus = () => axiosGet("/cpus", { sendToken: false });
export const getCpu = (id) => axiosGet(`/cpus/${id}`, { sendToken: false });
export const addCpu = (data) => axiosPost(`/cpus`, { sendToken: false, data });
export const updateCpu = (id, data) =>
  axiosPatch(`/cpus/${id}`, { sendToken: false, data });
export const deleteCpu = (id) =>
  axiosDelete(`/cpus/${id}`, { sendToken: false });
