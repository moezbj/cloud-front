import React, { useContext } from "react";
import { AuthContext } from "providers/AuthProvider";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="h-[80px] relative w-full bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
          <div className="relative flex w-full flex-wrap items-stretch">
          </div>
        </form> */}
        <h1 className="text-xl font-bold text-gray-800">
          {" "}
          Gestion services cloud
        </h1>

        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          {user ? <UserDropdown /> : <Link to="/auth/login">Connexion</Link>}
        </ul>
      </div>
    </nav>
  );
}
