import express from "express";
import {
  allDoctorsGeneralFrontend,
  loginDoctor,
  getDocAppointments,
  appointmentCompleted,
  appointmentCancel,
  docDashboard,
  docProfileData,
  updateProfileData,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctors-list", allDoctorsGeneralFrontend);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, getDocAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/docDashboard", authDoctor, docDashboard);
doctorRouter.get("/docProfile", authDoctor, docProfileData);
doctorRouter.post("/updateDocProfile", authDoctor, updateProfileData);

export default doctorRouter;
