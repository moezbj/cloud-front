import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllApplications = () =>
  axiosGet("/applications", { sendToken: false });
export const getApplication = (id) =>
  axiosGet(`/applications/${id}`, { sendToken: false });
export const addApplication = (data) =>
  axiosPost(`/applications`, { sendToken: false, data });
export const updateApplication = (id, data) =>
  axiosPatch(`/applications/${id}`, { sendToken: false, data });
export const deleteApplication = (id) =>
  axiosDelete(`/applications/${id}`, { sendToken: false });
