import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminDashboard, allDoctorsAdminFrontend, cancellAppointmentByAdmin, getAdminAppointments, loginAdmin } from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// This request is coming from /api/admin. Here the /api/admin as well as the below /add-doctor -> these both are called api enpoints
adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctorsAdminFrontend)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/getAdminAppointments', authAdmin, getAdminAppointments)
adminRouter.post('/cancel-appointment', authAdmin, cancellAppointmentByAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter