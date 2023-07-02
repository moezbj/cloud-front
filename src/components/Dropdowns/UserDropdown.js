import React, { useContext } from "react";
import localforage from "localforage";
import { useTranslation } from "react-i18next";
import { AuthContext } from "providers/AuthProvider";
import { Navigate } from "react-router";
import { useOutsideAlerter } from "hooks/useOutSideClick";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const { t, i18n } = useTranslation();
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    if (user) {
      setUser(null);
      localforage
        .removeItem("auth")
        .then(function () {
          return <Navigate to="/login" />;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  useOutsideAlerter(popoverDropdownRef, closeDropdownPopover);

  return (
    <>
      <p
        className="text-blueGray-500 block"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <i class="fa-duotone fa-user-tie fa-fade"></i>
          </span>
        </div>
      </p>
      {dropdownPopoverShow && (
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "bg-white text-base absolute z-50 right-8 top-20 py-2 list-none rounded shadow-lg w-32"
          }
        >
          <div
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
            }
            onClick={(e) => e.preventDefault()}
          >
            profile
          </div>
          <div className="h-0 my-2 border border-solid border-blueGray-100" />
          <p
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
            }
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            logout
          </p>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
