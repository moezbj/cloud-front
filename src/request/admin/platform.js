import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllPlatforms = () =>
  axiosGet("/platforms", { sendToken: false });
export const getPlatform = (id) =>
  axiosGet(`/platforms/${id}`, { sendToken: false });
export const addPlatform = (data) =>
  axiosPost(`/platforms`, { sendToken: false, data });
export const updatePlatform = (id, data) =>
  axiosPatch(`/platforms/${id}`, { sendToken: false, data });
export const deletePlatform = (id) =>
  axiosDelete(`/platforms/${id}`, { sendToken: false });
