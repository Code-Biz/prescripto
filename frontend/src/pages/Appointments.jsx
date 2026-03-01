import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, userToken, getDoctorsData } =
    useContext(AppContext);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState([]);
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const slotSpan = 60;

  const [docInfo, setDocInfo] = useState(null);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);

    // console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    // getting current date as e.g : Sun Dec 28 2025 11:51:12 GMT+0500
    setDocSlots([]);

    let today = new Date();
    let startingDay = 0;
    let lastDay = 7;
    if (today.getHours() < 21) {
      startingDay = 0;
      lastDay = 7;
    } else {
      startingDay = 1;
      lastDay = 8;
    }

    //For loop starts from 0 so that the first iteration do not increments and so today's date is preserved in first iteration
    for (let i = startingDay; i < lastDay; i++) {
      // getting date with index i.e todays value
      //currentDate basically acts as a variable name for every individual date slot in the for loop that is to be creaated on every iteration
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // adding one to the exact date number e.g 28+1
      // console.log("Day: " + i + " - > " + currentDate);

      // setting endTime that is last slot/hour avaible for booking today, which will be till 9:00p.m
      let lastSlot = new Date();
      lastSlot.setDate(today.getDate() + i);
      lastSlot.setHours(21, 0, 0, 0);
      // console.log("Day: " + i + " Ending Time- > " + lastSlot);

      //On the very first iteration current date and today date or same so therefore the following will run only on first iteration
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(
          currentDate.getMinutes() > slotSpan ? slotSpan : 0,
        );
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      //Basically this while is to store the hours of every day one by one into timeSlots of 7 days
      while (currentDate < lastSlot) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            date: new Date(currentDate),
            formattedHour: formattedTime,
          });
        }

        //Increment by 30 Minutes
        currentDate.setMinutes(currentDate.getMinutes() + slotSpan);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!userToken) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].date;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      console.log(backendUrl);

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { userToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (!docInfo?.slots_booked) return;
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          {/*  ----- Doctor Details ----- */}

          <div>
            <img
              className="bg-primary rounded-lg w-full sm:max-w-72"
              src={docInfo.image}
              alt=""
            />
          </div>

          {/* ----- Doc Info: name,degree, experience ... ----- */}
          <div className="flex-1 border border-gray-600 bg-white rounded-lg p-8 py-6 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 font-medium text-2xl text-gray-600">
              {docInfo.name}
              <img className="w-6" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-4 border rounded-full text-sm">
                {docInfo.experience}
              </button>
            </div>

            {/* ----- Doc About ----- */}
            <div>
              <p className="flex items-center gap-1 teext-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
              <p className="text-gray-500 font-medium mt-4">
                Appointment Fee:
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="sm:ml-78 sm:pt-4 mt-4 font-medium text-gray-600">
          <p>Booking Slots</p>

          <div className="flex gap-3 items-center overflow-x-scroll mt-4 w-full pb-3">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotTime(item[0].formattedHour);
                    setSlotIndex(index);
                  }}
                  className={`text-center py-6 rounded-full min-w-16 cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-20"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].date.getDay()]}</p>
                  <p>{item[0] && item[0].date.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex gap-3 overflow-x-scroll mt-4 w-full items-center">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.formattedHour)}
                  className={`text-sm font-light px-5 py-2 flex-shrink-0 rounded-full min-w-16 cursor-pointer ${
                    item.formattedHour === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.formattedHour.toLowerCase()}
                </p>
              ))}
          </div>

          <div>
            <button
              onClick={bookAppointment}
              className="bg-primary text-white text-sm px-14 py-3 rounded-full my-6 mb hover:scale-105 transition-all duration-300 "
            >
              Book An Appoinment
            </button>
          </div>
        </div>
        {/* ----- RELATED DOCTORS DIVISION */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
