import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addStockage } from "../../request/admin/stockage";
import { getAllMachines } from "../../request/admin/machine";
import useApiState from "../../hooks/useApiState";
import Select from "react-select";
import { generateRandomId } from "utils/generateId";

const AddStockageModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [stockageState, addStockageCall] = useApiState(addStockage);
  const [machinesState, getMachineCall] = useApiState(getAllMachines);
  const [machine, setMachine] = useState({});

  const onSubmit = (data) => {
    addStockageCall({
      ...data,
      id: generateRandomId(),
      machine: machine.value,
    });
  };
  useEffect(() => {
    getMachineCall();
  }, []);
  useEffect(() => {
    if (stockageState.data) {
      refetch();
      onClose();
    }
  }, [stockageState.data, onClose]);
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
          <label htmlFor="type_disque" className="text-[16px] text-[#000] pb-4">
            type_disque
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("type_disque", {
              required: "champs requis",
            })}
          />
          {errors.type_disque && (
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
          <label htmlFor="capacite" className="text-[16px] text-[#000] pb-4">
            capacite
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("capacite", {
              required: "champs requis",
            })}
          />
          {errors.capacite && (
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

export default AddStockageModal;
