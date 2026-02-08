import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

// THE BELOW FUNCTIONAL COMPONENT ACTS AS A FILTER ON ALL DOCTORS PAGE
const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h2 className="font-medium text-3xl">FInd By Speciality</h2>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center pt-5 w-full overflow-scroll gap-4">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-sm cursor-pointer shrink-0 hover:translate-y-[-10px] duration-500"
          >
            <img src={item.image} alt="" className="w-16 sm:w-24 mb-2" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
