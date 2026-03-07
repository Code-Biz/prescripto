import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  //  ********************************************************************
  //             DESTRUCTURING, STATES AND VARIABLES
  //  ____________________________________________________________________
  const { aToken, appointments, getAdminAppointments, cancelAppointmentAdmin } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormatted, currency } = useContext(AppContext);

  //  ********************************************************************
  //             FUNCTIONS
  //  ____________________________________________________________________

  //  ********************************************************************
  //             USE EFFECTS
  //  ____________________________________________________________________

  useEffect(() => {
    if (aToken) {
      console.log(appointments);

      getAdminAppointments();
    }
  }, [aToken]);

  //  ********************************************************************
  //             REACT COMPONENT
  //  ____________________________________________________________________

  return (
    <div className=" w-full bg max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className=" border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden gap-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  grid-flow-col py-3  px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  grid-flow-col text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
          >
            {/* 0.5fr */}
            <p className="max-sm:hidden">{index + 1}</p>
            {/* 3fr */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.userData.image}
                className="w-8 rounded-full"
              />
              <p>{appointment.userData.name}</p>
            </div>
            {/* 1fr */}
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>
            {/* 3fr */}
            <p>
              {slotDateFormatted(appointment.slotDate)},
              {"  " + appointment.slotTime}
            </p>
            {/* 3fr */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.docData.image}
                className="w-8 rounded-full bg-blue-100"
              />
              <p>{appointment.docData.name}</p>
            </div>
            {/* 1fr */}
            <p>
              {currency}
              {appointment.amount}
            </p>
            {/* 1fr */}
            {appointment.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointmentAdmin(appointment._id)}
                src={assets.cancel_icon}
                alt=""
                className="w-10 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
