import React from "react";
import CountUp from "react-countup";

export default function CardStats({ title, subTitle, img, lng }) {
  return (
    <div
      className={`relative flex-col flex h-[200px] w-[200px] bg-white rounded-full shadow-lg`}
    >
      <div className="flex justify-center items-center border-b-2 h-1/2">
        <div className="items-center justify-center w-[70px] h-auto">
          <img src={img} alt="logo" className="w-full h-full" />
        </div>
      </div>
      <div className="flex h-1/2">
        <div className="w-full flex flex-row">
          <div
            className={`w-1/2 flex justify-center ${
              lng === "ar" ? "pt-8 pr-4" : "pt-8 pl-4"
            }`}
          >
            <h5 className="text-blueGray-400 capitalize text-[16px] ">
              {title}
            </h5>
          </div>
          <div
            className={`w-1/2 flex justify-center ${
              lng === "ar" ? "pt-8 border-r-2" : "pt-8 border-l-2"
            }`}
          >
            <CountUp start={0} end={subTitle} duration={2.75} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span
                    ref={countUpRef}
                    className="text-blueGray-600 font-bold text-[16px]"
                  />
                </div>
              )}
            </CountUp>
          </div>
        </div>
      </div>
    </div>
  );
}
