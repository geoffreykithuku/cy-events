import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { auth , db} from "../firebase";

import { AuthContext } from "../context/AuthContext";
const Signup = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
          const user_doc = userCredential.user;
         

          setCurrentUser(user_doc);
          window.location.href = "/dashboard";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
      });
  };

  return (
    <div className="w-full bg-white text-[#435845] block items-center justify-center px-5 py-10 sm:py-20">
      <div className="max-w-[500px] mx-auto my-auto justify-center items-center flex flex-col border p-5 rounded">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="md:text-4xl text-2xl font-semibold text-center mb-5">
            Welcome to CyEvents
          </h1>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <span className="w-full flex flex-col">
            <button
              type="submit"
              className="bg-[#435585] text-white py-3 rounded-md"
            >
              Signup
            </button>

            <a href="/signin" className="text-[#435585] text-center w-full">
              Already have an account? Signin
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
