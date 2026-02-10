import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
}, { minimize: false });

const doctorModel = mongoose.model.doctor || mongoose.model('doctor', doctorSchema);
export default doctorModel

// A model named doctor(s) is created based on doctorSchema on the MongoDB and doctoreModel is basically the Javascript varaiable to be used in the code by developer.

// schema : its a structure like c++ classes structure -> You create a schema when you want structure + validation (e.g., user must have email, age is number).
// model: made from schema that lets you perform crud in mongodb database. somewhtat its like the class objects -> You create a schema when you want structure + validation (e.g., user must have email, age is number).

// In SQL terms:
// MongoDB Schema ≈ SQL table definition
// MongoDB Model ≈ SQL table + queries(SELECT / INSERT / UPDATE)