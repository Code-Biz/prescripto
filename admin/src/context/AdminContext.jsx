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
  const {data} = await axios.post(
        backendUrl + "/api/admin/change-availability",
        {docId},
        { headers: { aToken } },
      );

       
if (data.success) {
        toast.success(data.message); 
        getAllDoctors()
      } else {
        toast.error(data.message);
      }

} catch (error) {
  toast.error(error.message)
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
    changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
