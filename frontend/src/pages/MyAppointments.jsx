import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="mt-12 pb-3 border-b border-gray-400 font-medium text-zinc-700">
        My Appointments
      </p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="sm:flex sm:gap-6 py-2 border-b border-gray-400 grid grid-cols-[1fr_2fr] gap-4"
          >
            <div>
              <img src={item.image} alt="" className="w-32 bg-indigo-50" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="font-semibold text-neutral-700">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-neutral-700 mt-1 font-medium">Address:</p>
              <p className="text-sm">{item.address.line2}</p>
              <p className="text-sm">{item.address.line1}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                25, July, 2024 | 8:30 PM
              </p>
            </div>
            {/* THE BELOW DIV IS TO KEEP THE BUTTONS ON LEFT IN SMALL SCREENS  */}
            <div> </div>
            <div className="flex flex-col justify-end gap-2 ">
              <button className="text-stone-500 text-sm border rounded hover:bg-primary hover:text-white py-2 sm:min-w-48 transition-all dura">
                Pay Online
              </button>
              <button className="text-stone-500 text-sm border rounded hover:bg-red-600 hover:text-white py-2 sm:min-w-48 transition-all dura">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
