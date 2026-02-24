import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, allDoctorsAdminFrontend, loginAdmin } from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// This request is coming from /api/admin. Here the /api/admin as well as the below /add-doctor -> these both are called api enpoints
adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctorsAdminFrontend)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

export default adminRouter