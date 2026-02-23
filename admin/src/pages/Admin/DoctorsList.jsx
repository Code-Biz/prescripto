import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { aToken, allDoctors, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-scroll" >
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-4 gap-y-6">
        {allDoctors.map((item, index) => (
          <div key={index} className="border rounded-xl border-indigo-200 max-w-56 overflow-hidden cursor-pointer group">
            <img src={item.image} alt="" className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"/>
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm ">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input type="checkbox" onChange={()=>changeAvailability(item._id)} checked={item.available}  className=" accent-primary  "/>
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
