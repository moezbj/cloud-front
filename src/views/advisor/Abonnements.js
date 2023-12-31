import React, { useEffect, useState, useContext } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from "react-modal";
import {
  getAllAbonements,
  deleteAbonement,
} from "../../request/advisor/abonnement";
import useApiState from "../../hooks/useApiState";
import AddAbnForm from "../../components/Modals/AddAbonement";
import { AuthContext } from "providers/AuthProvider";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("libelle", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const Abonnement = () => {
  const [abnState, getabnCall] = useApiState(getAllAbonements);
  const [deleteState, deleteCall] = useApiState(deleteAbonement);
  const [recs, setRecs] = useState([]);
  const table = useReactTable({
    data: recs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { user } = useContext(AuthContext);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "700px",
    },
  };

  useEffect(() => {
    getabnCall();
  }, []);
  useEffect(() => {
    if (abnState.data && !abnState.errorCode) {
      setRecs(abnState.data);
    }
  }, [abnState.data, abnState.errorCode]);
  useEffect(() => {
    if (deleteState.data && !deleteState.errorCode) {
      getabnCall();
    }
  }, [deleteState.data, abnState.errorCode]);
  return (
    <div className="pt-24 px-16">
      {user.role.libelle === "responsable" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={openModal}
            type="button"
            className="focus:shadow-outline rounded-md w-[150px] h-[50px] bg-[#6610f2] py-1 px-2 text-white focus:outline-none"
          >
            Ajouter
          </button>
        </div>
      )}
      <table className="border-[1px] border-[#000] w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="border-b-[1px] border-t-[1px] border-t-[#000] border-b-[#000] px-4 py-2"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="border-b-[1px] border-t-[1px] border-t-[#000] border-b-[#000] px-4 py-2">
                <p>Action</p>
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="border-b-[1px] border-[#000]">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4  text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="py-2 px-4 text-center">
                  {user.role.libelle === "responsable" ? (
                    <i
                      className="fas fa-fas fa-trash"
                      onClick={() => deleteCall(row.original.id)}
                    ></i>
                  ) : (
                    <div
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() => window.alert("modif")}
                    >
                      <i className="fas fa-fas fa-check "></i>
                      <p className="">Acheter</p>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-4" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="w-[400px] h-[400px]">
          <h2>Ajouter Abonnement</h2>
          <AddAbnForm onClose={closeModal} refetch={getabnCall} />
        </div>
      </Modal>
    </div>
  );
};

export default Abonnement;
