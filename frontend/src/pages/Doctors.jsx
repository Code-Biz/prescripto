import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [showFilter, setShowFilters] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilters = () => {
    if (speciality) {
      setFilteredDocs(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilteredDocs(doctors);
    }
  };

  //The ApplyFilters Function/Effect is executed automatically everytime thers any change in the value of doctors or speciality
  useEffect(() => {
    applyFilters();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialists</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Left Paras Div */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-alls sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`${
            showFilter ? "flex" : "hidden sm:flex"
          } flex-col gap-3 text-sm text-gray-600`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto py-2 pl-3 pr-15 border border-gray-300 rounded hover:scale-105 transition-all duration-300 cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        {/* RIGHT DOCTORS LIST DIV */}
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
 gap-4 gap-y-6"
        >
          {filteredDocs.length > 0 ? (
            filteredDocs.map((item, index) => (
              <div
                onClick={() => navigate(`/appointments/${item._id}`)}
                className="w-fit border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] duration-300"
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
            ))
          ) : (
            <p className="text-center mt-20 text-2xl font-medium p-10 border rounded border-primary ">
              OOPS! <br />
              No Specialist Found ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
