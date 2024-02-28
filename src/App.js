import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";
import CreateEvent from "./components/createEvents";
import EditEvent from "./components/editEvent";

function App() {
  return (
  
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event" element={<EditEvent />} />


    </Routes>
    
  );
}

export default App;
