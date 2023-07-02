import React, { useEffect, useState, useContext } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { AuthContext } from "providers/AuthProvider";

import { getAllFactures, deleteFacture } from "../../request/client/facture";
import useApiState from "../../hooks/useApiState";
import AddFactureForm from "../../components/Modals/AddFacture";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("client.nom", {
    header: "Client",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("dateCreation", {
    header: "Date de création",
    cell: (info) => {
      const a = new Date(info.renderValue()).toLocaleDateString("fr");
      return a;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("etatPaiement", {
    header: "Status",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("montant", {
    header: "Montant",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const Factures = () => {
  const [facturesState, getFacturesCall] = useApiState(getAllFactures);
  const [deleteState, deleteCall] = useApiState(deleteFacture);
  const [factures, setFactures] = useState([]);
  const { user } = useContext(AuthContext)

  const table = useReactTable({
    data: factures,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
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
    getFacturesCall();
  }, []);
  useEffect(() => {
    if (facturesState.data && !facturesState.errorCode) {
      const res =
        user.role.libelle === "responsable"
          ? facturesState.data
          : facturesState.data.filter((f) => f.client._id === user._id);
      setFactures(res);
    }
  }, [facturesState.data, facturesState.errorCode]);
  useEffect(() => {
    if (deleteState.data && !deleteState.errorCode) {
      getFacturesCall();
    }
  }, [deleteState.data, facturesState.errorCode]);
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
                {user.role.libelle === "responsable" ? (
                  <td className="py-2 px-4 text-center">
                    <i
                      className="fas fa-fas fa-trash"
                      onClick={() => deleteCall(row.original.id)}
                    ></i>
                  </td>
                ) : (
                  <td className="py-2 px-4 text-center">
                    <i
                      className="fas fa-fas fa-edit cursor-pointer"
                      onClick={() =>
                        window.alert("module paiement  non valide")
                      }
                    >
                      {" "}
                      payer
                    </i>
                  </td>
                )}
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
          <h2>Ajouter Facture</h2>
          <AddFactureForm onClose={closeModal} refetch={getFacturesCall} />
        </div>
      </Modal>
    </div>
  );
};

export default Factures;
