import React from "react";
import EventCard from "./event";

const UserDashboard = () => {
  const event = {
    title: "Datascience summit 2021",
    description: "A summit for data scientists",
    date: "2021-12-12",
    time: "12:00",
    location: "Lagos, Nigeria",
    poster_url: "https://source.unsplash.com/random",
    is_vip: true,
    price: 0,
    no_of_tickets: 0,
  };

  return (
    <div className="w-full px-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 w-full mx-auto">
        <EventCard event={event} />
        <EventCard event={event} />
        <EventCard event={event} />
      </div>
    </div>
  );
};

export default UserDashboard;
