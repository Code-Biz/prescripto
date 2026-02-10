import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor } from "../controllers/adminController.js";

const adminRouter = express.Router();

// This request is coming from /api/admin. Here the /api/admin as well as the below /add-doctor -> these both are called api enpoints
adminRouter.post('/add-doctor', upload.single("image"), addDoctor)

export default adminRouter