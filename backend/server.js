//THIS IS THE INITAL FILE WHERE THE CLIENTS REQUEST SENT TO SERVER ARE READ AND DEALT. THIS FILE IS LOCATED ON SERVER AT PORT AND
//THE FILE AND ITS FUTNIONS EXECUTES IF THE CLIENT REQUEST IS RECEIVED AT PORT 4000 e.t.c

// ---------------- IMPORTS ----------------
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes_API_ENDPOINTS/adminRoute.js';
import doctorRouter from './routes_API_ENDPOINTS/doctorRoute.js';


// ---------------- APP CONFIG ----------------
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// ---------------- MIDDLEWARE ----------------
app.use(express.json())                            //Any request made to/from the backend will get passed through this method to convert data to json as this method is middleware
app.use(cors())                                    // decides which forntend (port or all ports) is allowed to talk to your backend. for the time beign all are allowed as nothing inisde cors brackets 

// ---------------- API ENDPOINTS ----------------
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-doctor (at this endpoint i.e /api/admin the adminRouter will be used where the endpoint add-doctor will be called where then the upload middleware runs and then is called the addDocotr Controller Function)
app.use('/api/doctor', doctorRouter)
//localhost:4000/api/admin/add-doctor (at this endpoint i.e /api/admin the adminRouter will be used where the endpoint add-doctor will be called where then the upload middleware runs and then is called the addDocotr Controller Function)

app.get('/', (req, res) => {
    res.send('THIS ENDPOINT AND THE API IS OK!')
})


// ---------------- SERVER START ----------------
app.listen(port, () => {
    console.log("********************* SERVER STARTED *********************", port); console.log("********************* SERVER STARTED *********************", port)
})






//app = express(), so basically as the file executes the funtion app.use() i.e express.use() executes now inside the express.use() is passed express.json() which basically is a function that basically helps in converting the data recieved in the request(POST) of the client to JSON to deal it at server.
//Because it’s middleware — it runs before all routes and prepares the request.

// This is literally the entire lifecycle of data from clicking a button in React → getting processed → showing the result on screen. Every React-Express app works on this principle.
// Frontend (React)
//     ↓ fetch / axios
// Server listening at specific port after started
//     ↓ request is received via a specific API endpoint
// API Endpoint (/api/users)    --->  PART OF BACKEND
//     ↓
// Backend Logic (Express)      --->  PART OF BACKEND
//     • Query database
//     • Apply filters / auth / calculations
//     • Prepare data in JSON format
//     ↓
// Response (JSON)              --->  PART OF BACKEND
//     ↓
// Frontend receives data       ---> Now can render in React component
