import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/home-main.svg";
import win from "../assets/cats/windows.png";
import ubuntu from "../assets/cats/ubuntu.png";
import redhat from "../assets/cats/redhat.png";
import centos from "../assets/cats/centos.png";
import tomcat from "../assets/cats/tomcat.png";
import postgres from "../assets/cats/postgres.png";
import Navbar from "components/Navbars/AdminNavbar";

const WelcomePage = () => {
  const cards = [
    {
      title: "Windows",
      description: "Instance de machine windows",
      img: win,
    },
    {
      title: "Ubuntu",
      description: "Instance de machine linux Ubuntu",
      img: ubuntu,
    },
    {
      title: "RedHat",
      description: "Instance de machine linux Ubuntu",
      img: redhat,
    },
    {
      title: "Centos",
      description: "Instance de machine linux Centos",
      img: centos,
    },
    {
      title: "PostGreSQL",
      description: "Instance de serveur PostGreSQL",
      img: tomcat,
    },
    {
      title: "Apache Tomcat",
      description: "Instance de serveur Tomcat 9",
      img: postgres,
    },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="px-24">
        <div className="py-16 flex justify-between mt-24">
          <div className="w-[47%] flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Welcome to Our Website
            </h1>
            <p className="text-xl text-center text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              sagittis turpis non urna eleifend posuere.
            </p>
            <div className="flex justify-center mt-12">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-[#6610f2] px-6 py-3 rounded-lg font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="w-[47%] flex justify-center items-center">
            <div className="lg:w-[300px] h-auto">
              <img src={logo} alt="d" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Our products
          </h1>
          <div className="flex flex-wrap justify-center">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-300 shadow-md m-2"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-auto h-28 mb-4"
                />
                <h3 className="text-xl font-medium mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default WelcomePage;
