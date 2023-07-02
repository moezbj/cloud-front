import React, { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import localforage from "localforage";
import logo from "../assets/img/home-bg.jpg";
import SideLogo from "../assets/img/home-main.svg";

import { login } from "../request/auth";
import useApiState from "../hooks/useApiState";
import { setAuthorizationBearer } from "../request/http";
import { AuthContext } from "../providers/AuthProvider";
export default function Login() {
  const { setUser, user } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginState, loginCall] = useApiState(login);
  const onSubmit = (data) => {
    delete data.user;
    loginCall({
      email: data.email,
      password: data.password,
    });
  };
  useEffect(() => {
    if (loginState.data) {
      setAuthorizationBearer(loginState.data.token);
      setUser(loginState.data);
      localforage.setItem("auth", JSON.stringify(loginState.data));
    }
  }, [loginState.data, setUser]);
  useEffect(() => {
    if (loginState.errorCode && !loginState.data) {
      setError(loginState.errorCode);
    }
  }, [loginState.data, loginState.errorCode]);
  if (user) return <Navigate to="/" replace />;
  return (
    <div class="lg:flex">
      <div class="lg:w-1/2 xl:max-w-screen-sm">
        <div class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div class="cursor-pointer flex items-center">
            <div class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              blockify
            </div>
          </div>
        </div>
        <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Log in
          </h2>
          <div class="mt-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="input-wrapper flex flex-col my-[10px]">
                <label htmlFor="email" className="text-[16px] text-[#000] pb-4">
                  Enter your username or email address
                </label>
                <input
                  type="email"
                  className="px-4 py-2 w-[435px] h-[54px] transition duration-300 border border-[#6610f2] rounded-[40px] focus:border-transparent focus:outline-none focus:ring-0"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="input-wrapper flex flex-col my-[10px]">
                <label
                  htmlFor="password"
                  className="text-[16px] text-[#000] pb-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="px-4 py-2 w-[435px] h-[54px] transition duration-300 border border-[#6610f2] rounded-[40px] focus:border-transparent focus:outline-none focus:ring-0"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-xs italic text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="input-wrapper flex flex-col my-[10px]">
                <p className="text-red-500">{error}</p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="focus:shadow-outline rounded-[34px] w-[232px] h-[50px] bg-[#6610f2] py-2 px-4 font-bold text-white shadow-lg focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
            <div class="mt-12 text-sm font-display font-semibold text-[#6610f2] text-center">
              Don't have an account ?{" "}
              <a class="cursor-pointer text-indigo-600 hover:text-indigo-800">
                <strong>Sign up</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:flex items-center justify-center bg-[#d7eaf0] flex-1 h-screen">
        <div class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <img src={SideLogo} alt="hello" />
        </div>
      </div>
    </div>
  );
}
