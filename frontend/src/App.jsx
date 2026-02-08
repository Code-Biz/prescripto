import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MyAppointments from "./pages/MyAppointments";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointments/:docId" element={<Appointments />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
