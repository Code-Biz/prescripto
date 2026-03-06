import express from 'express'
import { allDoctorsGeneralFrontend, loginDoctor,getDocAppointments } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/doctors-list', allDoctorsGeneralFrontend)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments',authDoctor, getDocAppointments)

export default doctorRouter