import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { addFacture } from "../../request/client/facture";
import useApiState from "../../hooks/useApiState";
import { generateRandomId } from "utils/generateId";
import { AuthContext } from "providers/AuthProvider";
import { getAllClients } from "../../request/admin/client";
import Select from "react-select";

const AddClientModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [factureState, addfactureCall] = useApiState(addFacture);
  const [clientsState, getClientCall] = useApiState(getAllClients);
  const [client, setClient] = useState({});
  console.log("client", client);
  const onSubmit = (data) => {
    addfactureCall({
      ...data,
      dateCreation: new Date(),
      id: generateRandomId(),
      etatPaiement: "en cour",
      client: client.value,
    });
  };
  useEffect(() => {
    getClientCall({ role: "client" });
  }, []);
  useEffect(() => {
    if (factureState.data) {
      refetch();
      onClose();
    }
  }, [factureState.data, onClose]);

  return (
    <div className="py-4 w-[650px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
          <label htmlFor="email" className="text-[16px] text-[#000] pb-4">
            Montant
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("montant", {
              required: "champs requis",
            })}
          />
          {errors.montant && (
            <p className="text-xs italic text-red-500">
              {errors.title.message}
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

export default AddClientModal;
