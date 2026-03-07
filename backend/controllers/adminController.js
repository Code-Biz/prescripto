import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

//  ********************************************************************
//              API-CONTROLLER FOR -> ADMIN LOGIN
//  ____________________________________________________________________

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const aToken = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, aToken });
    } else {
      res.json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API-CONTROLLER FOR -> ADD DOCTOR BY ADMIN
//  ____________________________________________________________________
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking for all to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Details missing" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email address!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must have 8 characters atleast!",
      });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Added To Database Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API-CONTROLLER FOR -> ALL DOCTORS LIST ON ADMIN SIDE
//  ____________________________________________________________________

const allDoctorsAdminFrontend = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             GET ALL APPOINTMENTS LIST
//  ____________________________________________________________________

const getAdminAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             CANCEL AN APPOINTMENT BY ADMIMN
//  ____________________________________________________________________
const cancellAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //RELEASING DOCTOR SLOT AFTER CANCELLATION OF APPOINTMENT
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    //In the below line we have filtered all those booked hours/slots with the help of variable timeslot except the one that matches the time of the appoinment that is cancelled
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (timeslot) => timeslot != slotTime,
    );

    //Now replacing the old slots_booked with the new one that do not contained the cancelled appointment slot
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             GET DASHBOARD DATA FOR ADMIN PANEL
//  ____________________________________________________________________
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const patients = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      total_doctors: doctors.length,
      total_patients: patients.length,
      total_appointments: appointments.length,
      latest_appointments: appointments.reverse().slice(0, 20),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export {
  loginAdmin,
  addDoctor,
  allDoctorsAdminFrontend,
  getAdminAppointments,
  cancellAppointmentByAdmin,
  adminDashboard,
};
