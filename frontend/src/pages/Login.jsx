import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Login");
  const  {backendUrl, userToken, setUserToken}= useContext(AppContext) ;
  const navigate = useNavigate();
  
  const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
          if(state==="Sign Up"){
            const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password});
            if(data.success){
              localStorage.setItem('userToken',data.token)
              setUserToken(data.token)
              toast.success("Registration Successfull")
            }
            else{
              toast.error(data.message)
            }}

            else{
               const {data} = await axios.post(backendUrl+'/api/user/login',{email,password});
            if(data.success){
              localStorage.setItem('userToken',data.userToken)
              setUserToken(data.userToken)
              toast.success("Login Successfull")
            }
            else{
              toast.error(data.message)
            }
            
          }} catch (error) {
            
            toast.error(error.message)
        }
  };

 
  useEffect(()=>{
      setName("");
    setEmail("");
    setPassword("");
  },[state])

  useEffect(()=>{ 
  if(userToken){
    navigate('/')
  }  },[userToken])
  
  return (
    
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start border p-8 min-w-[320px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login "}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in  "} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <label htmlFor="fullName">Full Name</label>
            <br />
            <input
              type="text"
              id="fullName"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
              className="border border-zinc-300 w-full rounded p-2 mt-1"
            />
          </div>
        )}
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="border border-zinc-300 w-full rounded p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="border border-zinc-300 w-full rounded p-2 mt-1"
          />
        </div>
        <button type="submit" className="w-full bg-primary py-2 rounded-md text-base text-white">
          {state === "Sign Up" ? "Create Account" : "Login "}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}
              className="underline cursor-pointer text-primary"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="underline cursor-pointer text-primary"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
