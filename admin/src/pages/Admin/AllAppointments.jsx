import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

const AllAppointments = () => {
  const { aToken, appointments, getAdminAppointments } =
    useContext("AdminContext");

  useEffect(() => {
    if (aToken) {
      getAdminAppointments();
    }
  }, [aToken]);

  return (
    <div>
      <p>AllApointments</p>

      <div>
        <div>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
