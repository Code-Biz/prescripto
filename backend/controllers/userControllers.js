import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

//  ********************************************************************
//             API FOR USER REGISTRATION
//  ____________________________________________________________________

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.json({ success: false, message: "Missing Details!" });
    }

    //VALIDATION OF EMAIL, PASSWORD

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter valid email address!",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: `Hey ${name}! Password must be of 8 characters atleast`,
      });
    }

    //HASIHNG PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // CREATING A NEW USERMODEL BASED ON USERDATA, SAVING IT ON DB, AFTER SAVING THE RESPONSE WHICH IS ACTUALLY THE DATA SAVED IS STORED IN THE VARIABLE USER FOR LATER USE
    const newUser = new userModel(userData);
    const user = await newUser.save();

    //TOKEN GENERATION
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  **************************************************************************************************************
//             API FOR USER LOGIN (password recieved -> password matched with db password-> token signed/created)
//  ______________________________________________________________________________________________________________

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User deoes not exit!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, userToken });
    } else {
      res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API TO GET USER PROFILE DATA TO SHOW ON PROFILE
//  ____________________________________________________________________

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
    console.log("getProfile() -> " + userData);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API TO UPDATE USER PROFILE DATA FROM INTERFACE
//  ____________________________________________________________________

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Name Missing!" });
    }
    if (!phone) {
      return res.json({ success: false, message: "Phone Missing!" });
    }
    if (!dob) {
      return res.json({ success: false, message: "DOB Data Missing!" });
    }
    if (!gender) {
      return res.json({ success: false, message: "Gender Data Missing!" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    //Upload image to cloudinary and get its url that would be stored in db and shown on frontend
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  ********************************************************************
//             API FOR APPOINTMENT BOOKING
//  ____________________________________________________________________

const bookAppointment = async (req, res) => {
  try {
    // DOCTOR DATA AND SLOT BOOKING ON DOCTOR SIDE
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // SAVING THE APPOITNMENT

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked; // Above we have taken out the slotsBooked Data from docData in the slots_booked variable. Now here we eleted the slots data in docData as we have to store docData in appointments data where its not required, after that we will restore that slots Booked data along with the nw slot added into the docData again. Just removing for appoitnment data!

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      ampunt: docData.fees,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ status: true, message: "Appointment Booked!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };
