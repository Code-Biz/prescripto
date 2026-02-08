import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoctors, setRelDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );

      setRelDoctors(doctorsData);
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="flex flex-col gap-4 py-16 items-center md:mx-10 text-gray-900">
      <h2 className="text-3xl font-medium">Top Doctors To Book Appointment</h2>
      <p className="sm:w-1/3 text-sm text-center">
        Simply browser through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] pt-5 gap-4 gap-y-6 px-3 sm:px-0">
        {relDoctors.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border w-fit border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] duration-300"
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

export default RelatedDoctors;
