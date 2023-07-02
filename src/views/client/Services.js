import React from "react";

const Services = () => {
  const cards = [
    {
      title: "Saas",
      description: "Saas",
    },
    {
      title: "PAAS",
      description: "PAAS",
    },
    {
      title: "IAAS",
      description: "IAAS",
    },
  ];
  return (
    <div>
      <div className="mt-16 mx-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Nos services</h1>
        <div className="flex flex-wrap justify-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-300 shadow-md m-2"
            >
              <h3 className="text-xl font-medium mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Services;
