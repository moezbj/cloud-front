/*eslint-disable*/
import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";
import classNames from "utils/classNames";
import Logo from "assets/img/logoCLoud.png";
export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigation = useNavigate();
  const menuPaths = {
    admin: [
      {
        name: "Gestion des services",
        links: [
          {
            name: "Application",
            links: "/admin/services/application",
            icon: "fas fa-fas fa-radiation",
          },
          {
            name: "Platforme",
            links: "/admin/services/platforme",
            icon: "fas fa-fas fa-radiation",
          },
          {
            name: "Machines",
            links: "/admin/services/machine",
            icon: "fas fa-fas fa-radiation",
          },
        ],
        icon: "fas fa-fas fa-layer-group",
      },
      {
        name: "Gestion des ressources",
        links: [
          {
            name: "CPU",
            links: "/admin/resources/cpu",
            icon: "fas fa-fas fa-radiation",
          },
          {
            name: "RAM",
            links: "/admin/resources/ram",
            icon: "fas fa-fas fa-radiation",
          },
          {
            name: "Stockage",
            links: "/admin/resources/stockage",
            icon: "fas fa-fas fa-radiation",
          },
        ],
        icon: "fas fa-fas fa-user-graduate",
      },
      {
        name: "Gestion des utlisateurs",
        links: "/admin",
        icon: "fas fa-fas fa-user-graduate",
      },
    ],
    client: [
      {
        name: "Factures",
        links: "/client",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Reclamations",
        links: "/client/reclamations",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Demandes",
        links: "/client/demande",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Abonnements",
        links: "/client/abonnements",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Services",
        links: "/client/services",
        icon: "fas fa-fas fa-home",
      },
    ],
    responsable: [
      {
        name: "Clients",
        links: "/responsable",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Reclamations",
        links: "/responsable/reclamations",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Factures",
        links: "/responsable/factures",
        icon: "fas fa-fas fa-home",
      },
      {
        name: "Abonnements",
        links: "/responsable/abonnement",
        icon: "fas fa-fas fa-home",
      },
    ],
  };
  const paths = user ? menuPaths[user.role.libelle] : [];
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [selectedItem, setSelected] = React.useState("");

  return (
    <>
      <div
        className={`min-h-screen px-4 shadow shadow-gray-200 bg-[#fff] border-r-[1px] border-r-[#ccc]`}
        style={{
          width: collapseShow ? 300 : 60,
          overflow: collapseShow ? "auto" : "hidden",
        }}
      >
        <div
          className="w-full flex items-center"
          onClick={() => {
            setCollapseShow(!collapseShow);
            setSelected("");
          }}
        >
          <img src={Logo} alt="de" />
        </div>

        <div className="mt-4 flex flex-col relative">
          {paths?.map((menu, i) => {
            const isString = typeof menu.links === "string";
            return (
              <div key={menu.name} className="flex flex-col min-h-48">
                <div
                  onClick={
                    isString
                      ? () => navigation(menu.links)
                      : () => {
                          selectedItem === menu.name
                            ? setSelected("")
                            : setSelected(menu.name);
                        }
                  }
                  key={i}
                  className={`group flex items-center text-md gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                  style={{
                    backgroundColor: pathname === menu.links ? "#e5572b" : "",
                  }}
                >
                  <h2
                    className="cursor-pointer text-black hover:text-white"
                    style={{
                      display: !collapseShow ? "none" : "",
                    }}
                  >
                    {menu?.name}
                  </h2>
                </div>
                {isString ? (
                  <div />
                ) : (
                  <div
                    className="transition duration-150 ease-linear"
                    style={{
                      height:
                        selectedItem === menu.name ? "fit-content" : "0px",
                      overflow: selectedItem === menu.name ? "auto" : "hidden",
                    }}
                  >
                    {menu.links?.map((path) => (
                      <div className={`pl-4 py-2`}>
                        <i
                          className={classNames(
                            path.icon,
                            "text-black text-sm hover:text-white "
                          )}
                          style={{ marginRight: "8px" }}
                        ></i>
                        <Link to={path.links} className="text-black">
                          {path.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
