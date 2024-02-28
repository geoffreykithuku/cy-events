import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";
import CreateEvent from "./components/createEvents";

function App() {
  return (
  
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create-event" element={<CreateEvent />} />


    </Routes>
    
  );
}

export default App;
