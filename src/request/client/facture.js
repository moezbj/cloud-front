import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllFactures = () => axiosGet("/factures", { sendToken: false });
export const getFacture = (id) =>
  axiosGet(`/factures/${id}`, { sendToken: false });
export const addFacture = (data) =>
  axiosPost(`/factures`, { sendToken: false, data });
export const updateFacture = (id, data) =>
  axiosPatch(`/factures/${id}`, { sendToken: false, data });
export const deleteFacture = (id) =>
  axiosDelete(`/factures/${id}`, { sendToken: false });
