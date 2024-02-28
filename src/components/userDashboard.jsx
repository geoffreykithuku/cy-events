import React, { useContext, useEffect } from "react";
import EventCard from "./event";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "../firebase";

const UserDashboard = () => {
  const { events, setEvents } = useContext(AuthContext);

  const getEvents = async () => {
    const q = query(collection(db, "events"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEvents((prev) => {
        return [...prev, doc.data()];
      });
    });
  };

  useEffect(() => {
    getEvents();
  }, []);


  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.email);
  return (
    <div className="w-full px-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 w-full mx-auto">
        {events.map((event, index) => {
          return <EventCard event={event} key={index} />;
        })}
              
      </div>
    </div>
  );
};

export default UserDashboard;
