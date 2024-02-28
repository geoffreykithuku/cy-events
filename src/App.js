import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";
import CreateEvent from "./components/createEvents";
import EditEvent from "./components/editEvent";
import UserDashboard from "./components/userDashboard";

  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
  <div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event" element={<EditEvent />} />
      <Route path="/dashboard" element={<UserDashboard />} />


      </Routes>
      
      <ToastContainer />
  </div>
    
  );
}

export default App;
