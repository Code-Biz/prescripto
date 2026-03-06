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

export {
  changeAvailability,
  allDoctorsGeneralFrontend,
  loginDoctor,
  getDocAppointments,
};
