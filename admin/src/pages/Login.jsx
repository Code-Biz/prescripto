import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  //Using AdminContext we are getting whatever has been provided by its Provider Gloabally. such as the setaToken in this case
  const { setAtoken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          setAtoken(data.token);
          localStorage.setItem("aToken", data.token);
          toast.info("Token Generated ");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 items-start p-8 min-w-85 sm:min-w-96  rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto items-start ">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-full text-white py-2 rounded-md text-base cursor-pointer "
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer text-md font-semibold"
              onClick={() => {
                setState("Doctor");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer text-md font-semibold"
              onClick={() => {
                setState("Admin");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
