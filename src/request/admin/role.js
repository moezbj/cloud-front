import { axiosGet } from "../http";
export const getAllRoles = () => axiosGet("/roles", { sendToken: false });
