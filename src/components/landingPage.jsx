import React from "react";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-[#363062] text-[#F5E8C7] py-10 sm:py-[140px] px-5">
      <div className="max-w-[500px] mx-auto my-auto justify-center items-center flex flex-col">
        <h1 className="text-5xl font-semibold text-center mb-5">
          Welcome to <span className="border-b-4 border-[#818FB4]">CyEvents</span>
        </h1>
        <p className="font-medium text-lg text-center mb-5">
            The best place to find events near you. You can book tickets for events and also create your own events if you are an admin.
        </p>
        
          <button className="bg-[#435585] shadow-sm px-5 py-3 rounded-md font-semibold text-xl mx-auto">
            Get Started
          </button>
       
      </div>
    </div>
  );
};

export default LandingPage;
