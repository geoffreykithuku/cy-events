import React, { useContext, useEffect } from "react";
import EventCard from "./event";
import { AuthContext } from "../context/AuthContext";


const UserDashboard = () => {
  const { events, getEvents } = useContext(AuthContext);

 

  useEffect(() => {
    getEvents();
  }, []);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full px-5">
      {currentUser && (
        <h1 className="text-3xl font-bold text-[#363062] mb-5">
          Welcome {currentUser.email}
        </h1>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 w-full mx-auto">
        {events.map((event, index) => {
            return <EventCard event={event} key={index} />;
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
