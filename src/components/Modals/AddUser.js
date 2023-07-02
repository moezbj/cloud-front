import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "../../request/admin/users";
import { getAllRoles } from "../../request/admin/role";
import useApiState from "../../hooks/useApiState";
import Select from "react-select";
import { generateRandomId } from "utils/generateId";

const AddUserModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userState, addUserCall] = useApiState(addUser);
  const [rolesState, getRoleCall] = useApiState(getAllRoles);
  const [role, setRole] = useState({});

  const onSubmit = (data) => {
    addUserCall({
      ...data,
      id: generateRandomId(),
      role: role.value,
    });
  };
  useEffect(() => {
    getRoleCall();
  }, []);
  useEffect(() => {
    if (userState.data) {
      refetch();
      onClose();
    }
  }, [userState.data, onClose]);
  return (
    <div className="py-4 w-[650px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="email" className="text-[16px] text-[#000] pb-4">
            Email
          </label>
          <input
            type="email"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
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
          <label htmlFor="nom" className="text-[16px] text-[#000] pb-4">
            Nom & prénom
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("nom", {
              required: "champs requis",
            })}
          />
          {errors.nom && (
            <p className="text-xs italic text-red-500">{errors.nom.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="password" className="text-[16px] text-[#000] pb-4">
            Password
          </label>
          <input
            type="password"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
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
          <label htmlFor="email" className="text-[16px] text-[#000] pb-4">
            Tél
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("tel", {
              required: "champs requis",
            })}
          />
          {errors.tel && (
            <p className="text-xs italic text-red-500">{errors.tel.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="role" className="text-[16px] text-[#000] pb-4">
            Role
          </label>
          <Select
            onChange={(e) => setRole(e)}
            options={rolesState.data?.map((r) => ({
              value: r._id,
              label: r.libelle,
            }))}
          />
          {errors.role && (
            <p className="text-xs italic text-red-500">{errors.role.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="email" className="text-[16px] text-[#000] pb-4">
            login
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("login", {
              required: "champs requis",
            })}
          />
          {errors.login && (
            <p className="text-xs italic text-red-500">
              {errors.login.message}
            </p>
          )}
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
    </div>
  );
};

export default AddUserModal;
