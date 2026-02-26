import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-4 py-16 items-center md:mx-10 text-gray-900">
      <h2 className="text-3xl font-medium">Top Doctors To Book Appointment</h2>
      <p className="sm:w-1/3 text-sm text-center">
        Simply browser through our extensive list of trusted doctors.
      </p>
      <div className="w-fit grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] pt-5 gap-4 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] duration-300"
          >
            <img src={item.image} alt="" className="bg-blue-50" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors"), scrollTo(0, 0);
        }}
        className="hover:scale-105 bg-blue-200 text-gray-600 rounded-full px-12 py-3 mt-10 duration-300 transition-alltransition-all"
      >
        See More
      </button>
    </div>
  );
};

export default TopDoctors;

//Difference between navigate and Link  is that navigate is a function to shift to some page where as Link is an elemenet/componenet that
//need attributes to shift to some page and can contain child elements as well.
//Link is JSX and works like <a> of html where as naviagte is javascript and works like a logic function and IS USED WHEN NAVIAGTING VIA ONCLICK FUNCTION.
//One-Line Memory Trick
//Link is for choices and just to move there, navigate is to perform some kinda action

//LEARN PROPER USAGE AND DIFFERENCE OF <Link>, <Navlink> and navigate()
// Remeber navigate is basically useNavigate()
