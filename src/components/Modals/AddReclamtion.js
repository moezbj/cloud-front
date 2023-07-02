import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { addReclamation } from "../../request/advisor/reclamation";
import useApiState from "../../hooks/useApiState";
import { generateRandomId } from "utils/generateId";
import { AuthContext } from "providers/AuthProvider";

const AddReclamationModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [reclamationState, addRecCall] = useApiState(addReclamation);
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    addRecCall({
      ...data,
      client: user._id,
      etat: "pending",
      dateCreation: new Date(),
      id: generateRandomId(),
    });
  };
  useEffect(() => {
    if (reclamationState.data) {
      refetch();
      onClose();
    }
  }, [reclamationState.data, onClose]);
  return (
    <div className="py-4 w-[650px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="titre" className="text-[16px] text-[#000] pb-4">
            Titre
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("titre", {
              required: "champs requis",
            })}
          />
          {errors.nom && (
            <p className="text-xs italic text-red-500">{errors.nom.message}</p>
          )}
        </div>
        <div className="input-wrapper flex flex-col my-[10px]">
          <label htmlFor="nom" className="text-[16px] text-[#000] pb-4">
            Text
          </label>
          <textarea
            type="text"
            className="px-4 py-2 resize-none w-full h-[54px] transition duration-300 border border-[#666] rounded-md focus:border-transparent focus:outline-none focus:ring-0"
            {...register("text", {
              required: "champs requis",
            })}
          />
          {errors.nom && (
            <p className="text-xs italic text-red-500">{errors.nom.message}</p>
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

export default AddReclamationModal;
