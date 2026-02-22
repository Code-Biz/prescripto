import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { aToken, allDoctors, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {allDoctors.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
