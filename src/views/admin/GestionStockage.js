import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { getAllStockages } from "../../request/admin/stockage";
import useApiState from "../../hooks/useApiState";
import AddUserModal from "../../components/Modals/AddStockage.js";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("machine", {
    cell: (info) => info.getValue().libelle,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.type_disque, {
    id: "type_disque",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>type_disque</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("capacite", {
    header: () => "capacite",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("libelle", {
    header: () => <span>libelle</span>,
    footer: (info) => info.column.id,
  }),
];

const GestionStockages = () => {
  const [stockagesState, getStockagesCall] = useApiState(getAllStockages);
  const [stockages, setStockages] = useState([]);
  console.log("stockagesState", stockages);
  const table = useReactTable({
    data: stockages,
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
    getStockagesCall();
  }, []);
  useEffect(() => {
    if (stockagesState.data && !stockagesState.errorCode) {
      setStockages(stockagesState.data);
    }
  }, [stockagesState.data, stockagesState.errorCode]);
  return (
    <div className="pt-24 px-16">
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          type="button"
          className="focus:shadow-outline rounded-md w-[150px] h-[50px] bg-[#6610f2] py-1 px-2 text-white focus:outline-none"
        >
          Ajouter
        </button>
      </div>
      <table className="border-[1px] border-[#000] w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="border-b-[1px] border-t-[1px] border-t-[#000] border-b-[#000] px-4 py-2 text-center"
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
            </tr>
          ))}
        </thead>
        <tbody className="border-b-[1px] border-[#000]">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
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
          <h2>Hello</h2>
          <AddUserModal onClose={closeModal} refetch={getStockagesCall} />
        </div>
      </Modal>
    </div>
  );
};

export default GestionStockages;
