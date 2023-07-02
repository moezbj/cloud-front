import React, { useEffect, useContext } from "react";
import localforage from "localforage";
import useApiState from "hooks/useApiState";
import { useForm } from "react-hook-form";

import { register } from "../request/auth";
import { setAuthorizationBearer } from "../request/http";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [registerState, registerCall] = useApiState(register);
  const { setUser, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* {
    firstname: "moez",
    lastname: "benj",
    email: "moezTeacher@yopmail.com",
    role: "teacher",
    password: "password2",
  } */
  const onSubmit = (data) => {
    registerCall({ ...data });
  };
  useEffect(() => {
    if (registerState.data) {
      setAuthorizationBearer(registerState.data.token);
      setUser(registerState.data.data);
      localforage.setItem("auth", JSON.stringify(registerState.data.data));
    }
  }, [registerState.data, setUser]);
  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <div className="input-wrapper flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
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

                  <div className="input-wrapper flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
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

                  <div className="input-wrapper">
                    <button
                      type="submit"
                      className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
