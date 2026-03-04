/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  //  ********************************************************************
  //             AUTHENTICATION
  //  ____________________________________________________________________
  const [aToken, setAtoken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //  ********************************************************************
  //             ALL DOCTORS
  //  ____________________________________________________________________
  const [allDoctors, setAllDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } },
      );

      if (data.success) {
        setAllDoctors(data.doctors);
        toast.success("Payload Received Successfully 📦");
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  ********************************************************************
  //              CHANGE DOCTOR AVAILABILITY
  //  ____________________________________________________________________
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  ********************************************************************
  //             FETCH ALL ADMIN APPOONTMENTS
  //  ____________________________________________________________________
  const [appointments, setAppointments] = useState([]);

  const getAdminAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/getAdminAppointments",
        {
          headers: { aToken },
        },
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //  ********************************************************************
  //             CANCEL APPOINTMENT API
  //  ____________________________________________________________________

  const cancelAppointmentAdmin = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        {
          headers: { aToken },
        },
      );
      if (data.success) {
        getAdminAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //  ********************************************************************
  //             GETDASHBOARD DATA API
  //  ____________________________________________________________________
  const [dashData, setDashData] = useState(false);
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //  ********************************************************************
  //              VALUES OF CONTEXT
  //  ____________________________________________________________________
  const value = {
    aToken,
    setAtoken,
    backendUrl,
    allDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAdminAppointments,
    cancelAppointmentAdmin,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
