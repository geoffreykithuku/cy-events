import React, { useState } from "react";

import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
    const { setCurrentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        
        const user = userCredential.user;
          setCurrentUser(user);
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
            Welcome Back
          </h1>

          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />

          <span className="w-full flex flex-col">
            <button
              type="submit"
              className="bg-[#435585] text-white py-3 rounded-md"
            >
              Signin
            </button>

            <a href="/signup" className="text-[#435585] text-center w-full">
              Dont have an account? Signup
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signin;
