import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addMachine } from "../../request/admin/machine";
import { getAllClients } from "../../request/admin/client";
import useApiState from "../../hooks/useApiState";
import Select from "react-select";
import { generateRandomId } from "utils/generateId";

const AddMachineModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [machineState, addMachineCall] = useApiState(addMachine);
  const [clientsState, getClientCall] = useApiState(getAllClients);
  const [client, setClient] = useState({});

  const onSubmit = (data) => {
    addMachineCall({
      ...data,
      id: generateRandomId(),
      client: client.value,
    });
  };
  useEffect(() => {
    getClientCall();
  }, []);
  useEffect(() => {
    if (machineState.data) {
      refetch();
      onClose();
    }
  }, [machineState.data, onClose]);
  console.log("machineState", machineState);
  return (
    <div className="py-4 w-[650px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="libelle" className="text-[16px] text-[#000] pb-4">
            libelle
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("libelle", {
              required: "champs requis",
            })}
          />
          {errors.libelle && (
            <p className="text-xs italic text-red-500">
              {errors.libelle.message}
            </p>
          )}
        </div>

        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="ip" className="text-[16px] text-[#000] pb-4">
            ip
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("ip", {
              required: "champs requis",
            })}
          />
          {errors.ip && (
            <p className="text-xs italic text-red-500">{errors.ip.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="client" className="text-[16px] text-[#000] pb-4">
            Client
          </label>
          <Select
            onChange={(e) => setClient(e)}
            options={clientsState.data?.map((r) => ({
              value: r._id,
              label: r.nom,
            }))}
          />
          {errors.client && (
            <p className="text-xs italic text-red-500">
              {errors.client.message}
            </p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="os" className="text-[16px] text-[#000] pb-4">
            os
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("os", {
              required: "champs requis",
            })}
          />
          {errors.os && (
            <p className="text-xs italic text-red-500">{errors.os.message}</p>
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

export default AddMachineModal;
