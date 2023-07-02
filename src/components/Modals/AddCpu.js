import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCpu } from "../../request/admin/cpu";
import { getAllMachines } from "../../request/admin/machine";
import useApiState from "../../hooks/useApiState";
import Select from "react-select";
import { generateRandomId } from "utils/generateId";

const AddCpuModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cpuState, addCpuCall] = useApiState(addCpu);
  const [machinesState, getMachineCall] = useApiState(getAllMachines);
  const [machine, setMachine] = useState({});

  const onSubmit = (data) => {
    addCpuCall({
      ...data,
      id: generateRandomId(),
      machine: machine.value,
    });
  };
  useEffect(() => {
    getMachineCall();
  }, []);
  useEffect(() => {
    if (cpuState.data) {
      refetch();
      onClose();
    }
  }, [cpuState.data, onClose]);
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
          <label htmlFor="nomber_cpu" className="text-[16px] text-[#000] pb-4">
            nomber_cpu
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("nomber_cpu", {
              required: "champs requis",
            })}
          />
          {errors.nomber_cpu && (
            <p className="text-xs italic text-red-500">{errors.ip.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="machine" className="text-[16px] text-[#000] pb-4">
            Machine
          </label>
          <Select
            onChange={(e) => setMachine(e)}
            options={machinesState.data?.map((r) => ({
              value: r._id,
              label: r.libelle,
            }))}
          />
          {errors.machine && (
            <p className="text-xs italic text-red-500">
              {errors.machine.message}
            </p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label
            htmlFor="architecture"
            className="text-[16px] text-[#000] pb-4"
          >
            architecture
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("architecture", {
              required: "champs requis",
            })}
          />
          {errors.architecture && (
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

export default AddCpuModal;
