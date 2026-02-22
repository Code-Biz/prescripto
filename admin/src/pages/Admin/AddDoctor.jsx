import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setspeciality] = useState("General Physician");
  const [education, setEducation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please add doctor image!");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", education);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      // ********************* console log Form Data *********************
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setEducation("");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        {/*1. Div For Profile Photos */}
        <div className="flex items-center mb-8 gap-4 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => {
              setDocImg(e.target.files[0]);
            }}
          />
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Expereince</p>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                value={experience}
                className="border rounded px-3 py-2"
              >
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
                onChange={(e) => {
                  setFees(e.target.value);
                }}
                value={fees}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/*2.b. Div For Right Side of Form */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setspeciality(e.target.value);
                }}
                value={speciality}
                className="border rounded px-3 py-2"
              >
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
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
                value={education}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                onChange={(e) => {
                  setAddress1(e.target.value);
                }}
                value={address1}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                onChange={(e) => {
                  setAddress2(e.target.value);
                }}
                value={address2}
                className="border rounded px-3 py-2"
              />
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
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={about}
          />
        </div>

        <button
          type="submit"
          className="text-white hover:scale-102 bg-primary mt-4 px-10 py-3 rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
