/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //  ********************************************************************
  //             FUNCTION FOR GETTING ALL DOCTORS ADDED IN DATABASE
  //  ____________________________________________________________________

  const [doctors, setDoctors] = useState([]);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/doctors-list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //  ********************************************************************
  //             GETTING USER PROFILE DATA FROM BACKEND
  //  ____________________________________________________________________

  const loadUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { userToken },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (userToken) {
      loadUserProfile();
    }
  }, [userToken]);

  //  ********************************************************************
  //              VALUES OF CONTEXT
  //  ____________________________________________________________________

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    userToken,
    setUserToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfile,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// 1. Without Provider → no sharing happens     2. value → data being shared globally   3. props.children = whatever will be wrapped inside the <AppContextProvider></AppContextProvider> such as Navbar + Doctors + Footer or App etc elements in the main.jsx folder
// THINK OF CONTEXT AS A COMMON NOTICE BOARD
// Any file that will be wrapped inside AppContextProvider element not the AppContext.Provider, will recieve what is being provided in the value-attribute also called as explicit-prop
// of AppContext.Provider by the return statement above and related funcitonality
// elelments wrapped inside a functional component are treated as implicit props and are called as props.children where children are represnt those wrapped components

// Simply:
// <AppContextProvider>
// <TopDoctors /> (THIS IS AN IMPLICIT PROP TO Parent component)
// </AppContextProvider>
// TopDoctors becomes a child (i.e props.children)
// Provider shares doctors globally via the value attribute
// TopDoctors can use:
// const {doctors} = useContext(AppContext)
