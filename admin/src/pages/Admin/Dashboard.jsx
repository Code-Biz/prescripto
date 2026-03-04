import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointmentAdmin } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-2   ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.doctor_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.total_doctors}
              </p>
              <p className="text-gray-400">Doctor(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.total_patients}
              </p>
              <p className="text-gray-400">Patient(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointments_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.total_appointments}
              </p>
              <p className="text-gray-400">Appointment(s)</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
            <img src={assets.list_icon} />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latest_appointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  src={appointment.docData.image}
                  className="rounded-full w-10"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    {appointment.docData.name}
                  </p>
                  <p className="text-gray-600">{appointment.slotDate}</p>
                </div>
                {appointment.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointmentAdmin(appointment._id)}
                    src={assets.cancel_icon}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                )}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
