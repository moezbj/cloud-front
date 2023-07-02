import { axiosPost } from "./http";

export const login = (data) =>
  axiosPost("/login", { data, sendToken: false });

export const refreshToken = (data) =>
  axiosPost("/auth/refresh", { data, sendToken: false });
export const register = (data) =>
  axiosPost("/auth/signup", { data, sendToken: false });

export const forgotPassword = (data) =>
  axiosPost("/auth/forgot", { data, sendToken: false });

export const resetPassword = (data) =>
  axiosPost("/auth/reset", { data, sendToken: false });

export const confirmUser = (data) =>
  axiosPost("/auth/confirm", { data, sendToken: false });
export const resendConfirm = () => axiosPost("/auth/resend");
