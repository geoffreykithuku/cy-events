import { Link } from "lucide-react";
import React from "react";

const Signup = () => {
  return (
    <div className="w-full bg-white text-[#435845] block items-center justify-center px-5 py-10 sm:py-20">
      <div className="max-w-[500px] mx-auto my-auto justify-center items-center flex flex-col border p-5 rounded">
        <form className="flex flex-col gap-5">
          <h1 className="md:text-5xl text-2xl font-semibold text-center mb-5">
            Signup
          </h1>
          <input
            type="text"
            placeholder="Full Name"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-5 py-3 rounded-md border border-[#435585]"
          />
          <span className="w-full flex flex-col">
            <button className="bg-[#435585] text-white py-3 rounded-md">
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
