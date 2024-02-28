import React from "react";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function checkWindowSize() {
    const isGreaterThan758px = window.innerWidth > 758;

    if (isGreaterThan758px) {
      setIsMobileMenuOpen(false);
    } else {
      return;
    }
  }

  window.addEventListener("resize", checkWindowSize);

  return (
    <nav className="flex justify-between items-center flex-wrap md:flex-nowrap w-full h-[100px]  px-5 sm:px-10 lg:px-[100px] py-5 font-poppins bg-[#435585] text-white">
      <h1 className="text-[32px] font-bold mr-2 md:mr-10 text-[#363062]]">
        Cy<span className="text-[#CE5A67]">Events</span>
      </h1>
      <button className="ml-auto md:hidden" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <X size={32} color="#CE5A67" strokeWidth={3} />
        ) : (
          <Menu size={32} color="#CE5A67" strokeWidth={3} />
        )}
      </button>
      <div className="relative w-full mx-auto">
        <ul
          className={`${
            isMobileMenuOpen
              ? "flex flex-col justify-center items-center absolute  w-full mx-auto gap-3 bg-white py-5 rounded text-[#435585]"
              : "hidden md:flex  gap-4 lg:gap-10 text-xl  md:justify-end items-center ml-auto w-full"
          } `}
        >
          <li className="hover:text-[#CE5A67] duration-300 ">
            <a href="#home">Events</a>
          </li>

          <li className="hover:text-[#CE5A67] duration-300 ">
            <a href="#about">MyEvents</a>
          </li>
          <li className="hover:text-[#CE5A67] duration-300 ">
            <a href="#skills">Create Event</a>
          </li>
          <li className="hover:text-[#CE5A67] duration-300 ">
            <a href="#projects">Signin</a>
          </li>
          <li className="hover:text-[#CE5A67] duration-300 ">
            <a href="#contact">Signup</a>
          </li>


        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
