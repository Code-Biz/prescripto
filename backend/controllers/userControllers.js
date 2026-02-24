import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


//  ********************************************************************
//             API FOR USER REGISTRATION
//  ____________________________________________________________________

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.json({ success: false, message: "Missing Details!" })
        }


        //VALIDATION OF EMAIL, PASSWORD

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Enter valid email address!" })
        }
        if (password.length < 8) {
            res.json({ success: false, message: `Hey ${name}! Password must be of 8 characters atleast` })
        }

        //HASIHNG PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, email, password: hashedPassword
        };

        // CREATING A NEW USERMODEL BASED ON USERDATA, SAVING IT ON DB, AFTER SAVING THE RESPONSE WHICH IS ACTUALLY THE DATA SAVED IS STORED IN THE VARIABLE USER FOR LATER USE
        const newUser = new userModel(userData);
        const user = await newUser.save()

        //TOKEN GENERATION
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token })




    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })


    }

};


export { registerUser }