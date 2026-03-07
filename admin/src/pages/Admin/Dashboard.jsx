import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const {
    aToken,
    dashData,
    appointments,
    getDashData,
    cancelAppointmentAdmin,
  } = useContext(AdminContext);

  const { slotDateFormatted } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, appointments]);
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
            <p className="font-semibold">20 Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 max-h-120 overflow-y-scroll">
            {appointments.latest_appointments === 0 ? (
              <div>
                <p className="text-primary font-light text-4xl m-10 flex justify-center">
                  No Appointments Till Now!
                </p>
              </div>
            ) : (
              dashData.latest_appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 my-2 hover:bg-gray-100"
                >
                  <img
                    src={appointment.docData.image}
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {appointment.docData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormatted(appointment.slotDate)}
                    </p>
                  </div>
                  {appointment.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : appointment.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointmentAdmin(appointment._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-10 cursor-pointer"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
