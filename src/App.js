import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";
import CreateEvent from "./components/createEvents";
import EditEvent from "./components/editEvent";
import UserDashboard from "./components/userDashboard";
import AdminDashboard from "./components/adminDashboard";
import ReservedEvents from "./components/myEvents";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-events" element={<ReservedEvents />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
