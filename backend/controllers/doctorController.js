import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  ********************************************************************
//             API-CONTROLLER FOR -> CHANGING DOCTORS AVAILABILITY
//  ____________________________________________________________________
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ****************************************************************************
//             API-CONTROLLER FOR -> ALL DOCTORS LIST ON GENERAL-FRONTEND SIDE
//  ____________________________________________________________________________

const allDoctorsGeneralFrontend = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             DOCTOR LOGIN API
//  ____________________________________________________________________

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      res.json({ success: false, message: "Doctor Not Found!" });
    }

    const isMatched = await bcrypt.compare(password, doctor.password);

    if (isMatched) {
      const dToken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, dToken });
      console.log(dToken);
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//   API FOR GETTING APPOINTMENTS FOR DOCOTR PAGE VIA DOCTOR_ID
//  ____________________________________________________________________

const getDocAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointmentsData = await appointmentModel.find({ docId });

    res.json({ success: true, appointmentsData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API TO MARK APPOINTMENT COMPLETED FROM DOCTOR SIDE
//  ____________________________________________________________________

const appointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment Completed" });
    } else {
      res.json({ success: false, message: "Mark Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API TO MARK APPOINTMENT CANCELLED FROM DOCTOR SIDE
//  ____________________________________________________________________

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      res.json({ success: false, message: "Mark Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API FOR DOCTOR DASHBOARD DATA
//  ____________________________________________________________________
const docDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointmentData = await appointmentModel.find({ docId });
    let earnings = 0;
    let patients = [];

    if (appointmentData) {
      appointmentData.map((appointment) => {
        if (!patients.includes(appointment.isCompleted)) {
          patients.push(appointment.userId);
        }

        if (appointment.isCompleted) {
          earnings += appointment.amount;
        }
      });
      console.log(appointmentData);

      const docDashData = {
        earnings,
        appointments: appointmentData.length,
        latestAppointments: appointmentData.reverse().slice(0, 5),
        patients: patients.length,
      };

      res.json({ success: true, docDashData });
    } else {
      res.json({ success: false, message: "Doctor Data Not Found" });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

//  ********************************************************************
//             API TO GET DOCTOR PROFILE DATA
//  ____________________________________________________________________
const docProfileData = async (req, res) => {
  try {
    const { docId } = req.body;
    const docProfileData = await doctorModel
      .findById(docId)
      .select("-password");

    res.json({ success: true, docProfileData });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

//  ********************************************************************
//             API TO UPDATE DOCTOR PROFILE DATA FROM DOC PANEL
//  ____________________________________________________________________
const updateProfileData = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    console.log({ docId }, { fees }, { address }, { available });

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export {
  changeAvailability,
  allDoctorsGeneralFrontend,
  loginDoctor,
  getDocAppointments,
  appointmentCompleted,
  appointmentCancel,
  docDashboard,
  docProfileData,
  updateProfileData,
};
