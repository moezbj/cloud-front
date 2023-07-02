import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllAbonements = () =>
  axiosGet("/abonements", { sendToken: false });
export const getAbonement = (id) =>
  axiosGet(`/abonements/${id}`, { sendToken: false });
export const addAbonement = (data) =>
  axiosPost(`/abonements`, { sendToken: false, data });
export const updateAbonement = (id, data) =>
  axiosPatch(`/abonements/${id}`, { sendToken: false, data });
export const deleteAbonement = (id) =>
  axiosDelete(`/abonements/${id}`, { sendToken: false });
