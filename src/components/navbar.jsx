import React from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser, is_admin } = useContext(AuthContext);

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

  // handle logout
  const handleLogout = async () => {
    // signout
    await auth.signOut();

    // redirect to login page
    window.location.href = "/signin";
  };

  return (
    <nav className="flex justify-between items-center flex-wrap md:flex-nowrap w-full h-[100px]  px-5 sm:px-10 lg:px-[100px] py-5 font-poppins bg-[#435585] text-white">
      <h1 className="text-[32px] font-bold mr-2 md:mr-10 text-[#363062]]">
        Cy<span className="text-[#cbdd24]">Events</span>
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
            <Link to="/">Home</Link>
          </li>
          {is_admin ? (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <Link to="/admin-dashboard">Events (admin)</Link>
            </li>
          ) : (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <Link to="/dashboard">Events</Link>
            </li>
          )}

          {is_admin ? (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <Link to="/dashboard">Events (user view)</Link>
            </li>
          ) : (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <Link to="/user-events">MyEvents</Link>
            </li>
          )}

          {is_admin && (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <Link to="/create-event">Create Event</Link>
            </li>
          )}
          {currentUser ? (
            <li className="hover:text-[#CE5A67] duration-300 ">
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="hover:text-[#CE5A67] duration-300 ">
                <Link to="/signin">Signin</Link>
              </li>
              <li className="hover:text-[#CE5A67] duration-300 ">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
