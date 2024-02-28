import React, { useState, useContext, useEffect } from "react";
import EventCard from "./event";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  addDoc,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";
import { toast } from "react-toastify";

const ReservedEvents = () => {
  const { currentUser, events, getEvents, userEvents, setUserEvents } =
    useContext(AuthContext);

  const getRsvps = async () => {
    const rsvpsRef = collection(db, "rsvps");
    const q = query(rsvpsRef, where("user_id", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    let eventarray = [];
    querySnapshot.forEach((doc) => {
      eventarray.push({ ...doc.data(), _id: doc.id });
    });
    setUserEvents(eventarray);
  };
  const filteredEvents = events.filter((event) => {
    return userEvents.some((rsvp) => rsvp.event_id === event._id);
  });

  useEffect(() => {
    getEvents();
    getRsvps();
  }, []);

  return (
    <div className="w-full px-5">
      <h1 className="text-3xl font-bold text-[#435585] text-center my-5">
        Events that you have reserved
      </h1>
      <br />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 w-full mx-auto items-center justify-center">
        {filteredEvents.map((event, index) => {
          return <EventCard event={event} key={index} />;
        })}
      </div>

      {!currentUser ? (
        <p className="text-xl  text-[#f02626] text-center my-5 w-full">
          Please login to view your reserved events
        </p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-xl  text-[#f02626] text-center my-5 w-full">
          You have not reserved any events
        </p>
      ) : null}
    </div>
  );
};

export default ReservedEvents;
