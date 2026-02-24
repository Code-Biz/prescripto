import express from 'express'
import { allDoctorsGeneralFrontend } from '../controllers/doctorController.js'

const doctorRouter = express.Router();

doctorRouter.get('/doctors-list', allDoctorsGeneralFrontend)

export default doctorRouter