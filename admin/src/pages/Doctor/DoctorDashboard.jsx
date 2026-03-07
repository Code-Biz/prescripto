import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    getDocDashData,
    docDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormatted } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDocDashData();
    }
  }, [dToken]);
  return (
    docDashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-2   ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.earning_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {docDashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointments_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {docDashData.appointments}
              </p>
              <p className="text-gray-400">Patient(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-primary cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {docDashData.patients}
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
            {docDashData.latestAppointments.length === 0 ? (
              <div>
                <p className="text-primary font-light text-4xl m-10 flex justify-center">
                  No Appointments Till Now!
                </p>
              </div>
            ) : (
              docDashData.latestAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 my-2 hover:bg-gray-100"
                >
                  <img
                    src={appointment.userData.image}
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {appointment.userData.name}
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
                    <div className="flex ">
                      <img
                        onClick={() => {
                          cancelAppointment(appointment._id);
                          getDocDashData();
                        }}
                        src={assets.cancel_icon}
                        alt=""
                        className=" w-8 cursor-pointer hover:scale-105 "
                      />
                      <img
                        onClick={() => {
                          completeAppointment(appointment._id);
                          getDocDashData();
                        }}
                        src={assets.tick_icon}
                        alt=""
                        className=" w-8 cursor-pointer hover:scale-105"
                      />
                    </div>
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

export default DoctorDashboard;
