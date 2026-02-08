import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("********************* MONGODB CONNECTED *********************"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
};

export default connectDB







// mongodb server: server that serves mongodb
// actual database -> MONGODB: the no sql database software via which the database i.e the data is handled

// Below are for user help
// node library -> mongoose: A Node.js libary to interact with MONGODB while coding via schemas and models
// shell->    mongosh: a shell like cmd to interact with MONGODB
// app->      mongoDB Compass: A GUI based tool to interact with MONGODB
// website->  mongoDB Atlas: A website to interact with MONGODB