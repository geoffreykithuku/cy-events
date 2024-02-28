import React, { useContext } from "react";
import EventCard from "./event";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  // a user can only book a maximum of 5 tickets
  // a user can rsvp for an event if he/she is authenticated
  // a user can only like an event once and can unlike an event and only if he/she is authenticated
  // if a user is an admin, he/she can create an event, edit an event and delete an event
  // all the data is stored in firestore and the user authentication is done with firebase.
  // admin email is admin@admin.com
  // admin password is admin
  // if the current user.email is equal to admin email, then the user is an admin else the user is not an admin
  // if the user is an admin, the user can create an event, edit an event and delete an event
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

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.email);
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
