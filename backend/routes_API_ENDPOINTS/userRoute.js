import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancellAppointment} from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser,bookAppointment)
userRouter.get('/getUserAppointments', authUser,getUserAppointments)
userRouter.post('/cancell-appointment', authUser,cancellAppointment)

export default userRouter