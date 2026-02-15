import React from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  return (
    <form className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        {/*1. Div For Profile Photos */}
        <div className="flex items-center mb-8 gap-4 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/*2. Div For Form */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/*2.a. Div For Left Side of Form*/}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Expereince</p>
              <select name="" id="" className="border rounded px-3 py-2">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                placeholder="fees"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>
          </div>

          {/*2.b. Div For Right Side of Form */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select name="" id="" className="border rounded px-3 py-2">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Peditricians">Peditricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterlogist">Gastroenterlogist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                className="border rounded px-3 py-2"
              ></input>
              <input
                type="text"
                placeholder="Address 2"
                required
                className="border rounded px-3 py-2"
              ></input>
            </div>
          </div>
        </div>

        {/*3. Div For About Doctor */}
        <div>
          <p className="mt-4 mb-2"> About Doctor</p>
          <textarea
            type="text"
            placeholder="Write about doctor"
            className="border  w-full px-4 pt-2 rounded"
            rows={5}
          />
        </div>

        <button className="text-white bg-primary mt-4 px-10 py-3 rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
