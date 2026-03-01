import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, userToken, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormatted = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      (dateArray[0] < 10 ? 0 + dateArray[0] : dateArray[0]) +
      " " +
      months[Number(dateArray[1])] +
      " " +
      dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/getUserAppointments",

        { headers: { userToken } },
      );

      if (data.success) {
        //reverse will make the recent appointment to be displayed on top instead of bottom
        setAppointments(data.appointmentsData.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancellAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancell-appointment",
        { appointmentId },
        { headers: { userToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments;
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserAppointments();
    }
  }, [userToken, appointments]);

  return (
    appointments && (
      <div>
        <p className="mt-12 pb-3 border-b border-gray-400 font-medium text-zinc-700">
          My Appointments
        </p>
        <div>
          {appointments.map((item, index) => (
            <div
              key={index}
              className="sm:flex sm:gap-6 py-2 border-b border-gray-400 grid grid-cols-[1fr_2fr] gap-4"
            >
              <div>
                <img
                  src={item.docData.image}
                  alt=""
                  className="w-32 bg-indigo-50"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="font-semibold text-neutral-700">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-neutral-700 mt-1 font-medium">Address:</p>
                <p className="text-sm">{item.docData.address.line2}</p>
                <p className="text-sm">{item.docData.address.line1}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>
                  {slotDateFormatted(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              {/* THE BELOW DIV IS TO KEEP THE BUTTONS ON LEFT IN SMALL SCREENS  */}
              <div> </div>
              <div className="flex flex-col justify-end gap-2 ">
                {!item.cancelled && (
                  <button className="text-stone-500 text-sm border rounded hover:bg-primary hover:text-white py-2 sm:min-w-48 transition-all dura">
                    Pay Online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancellAppointment(item._id)}
                    className="text-stone-500 text-sm border rounded hover:bg-red-600 hover:text-white py-2 sm:min-w-48 transition-all dura"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MyAppointments;
