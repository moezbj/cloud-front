import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllStockages = () =>
  axiosGet("/stockages", { sendToken: false });
export const getStockage = (id) =>
  axiosGet(`/stockages/${id}`, { sendToken: false });
export const addStockage = (data) =>
  axiosPost(`/stockages`, { sendToken: false, data });
export const updateStockage = (id, data) =>
  axiosPatch(`/stockages/${id}`, { sendToken: false, data });
export const deleteStockage = (id) =>
  axiosDelete(`/stockages/${id}`, { sendToken: false });
