import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

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
        <button className="w-full bg-primary py-2 rounded-md text-base text-white">
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
