import React from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  return (
    <form className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        {/*1. Div For Profile Photos */}
        <div className="flex items-center mt-4 gap-2">
          <label htmlFor="doc-img">
            <img src={assets.upload_area} />
          </label>
          <input type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/*2. Div For Form */}
        <div className="flex">
          {/*2.a. Div For Left Side of Form*/}
          <div>
            <div>
              <p>Doctor Name</p>
              <input type="text" placeholder="Name" required></input>
            </div>
            <div>
              <p>Doctor Email</p>
              <input type="email" placeholder="Email" required></input>
            </div>
            <div>
              <p>Doctor Password</p>
              <input type="password" placeholder="Password" required></input>
            </div>
            <div>
              <p>Expereince</p>
              <select name="" id="">
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
            <div>
              <p>Fees</p>
              <input type="number" placeholder="fees" required></input>
            </div>
          </div>

          {/*2.b. Div For Right Side of Form */}
          <div>
            <div>
              <p>Speciality</p>
              <select name="" id="">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Peditricians">Peditricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterlogist">Gastroenterlogist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input type="text" placeholder="Education" required></input>
            </div>

            <div>
              <p>Address</p>
              <input type="text" placeholder="Address 1" required></input>
              <input type="text" placeholder="Address 2" required></input>
            </div>
          </div>
        </div>

        {/*3. Div For About Doctor */}
        <div>
          <p>About Doctor</p>
          <textarea
            type="text"
            placeholder="Write about doctor"
            className="border rounded-sm"
            rows={5}
          />
        </div>

        <button>Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
