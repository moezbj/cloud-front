import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { getAllApplications } from "../../request/admin/application";
import useApiState from "../../hooks/useApiState";
import AddUserModal from "../../components/Modals/AddApplication.js";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row.nom_app, {
    id: "nom_app",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>nom_app</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("version", {
    header: () => "version",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("libelle", {
    header: () => <span>libelle</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("client", {
    cell: (info) => info.getValue().nom,
    footer: (info) => info.column.id,
  }),
];

const GestionApplications = () => {
  const [applicationsState, getApplicationsCall] =
    useApiState(getAllApplications);
  const [applications, setApplications] = useState([]);
  console.log("applicationsState", applications);
  const table = useReactTable({
    data: applications,
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
    getApplicationsCall();
  }, []);
  useEffect(() => {
    if (applicationsState.data && !applicationsState.errorCode) {
      setApplications(applicationsState.data);
    }
  }, [applicationsState.data, applicationsState.errorCode]);
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
          <AddUserModal onClose={closeModal} refetch={getApplicationsCall} />
        </div>
      </Modal>
    </div>
  );
};

export default GestionApplications;
