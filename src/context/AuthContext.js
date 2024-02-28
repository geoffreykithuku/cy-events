import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
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

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const is_admin = currentUser?.email === "admin@gmail.com";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getEvents = async () => {
    const q = query(collection(db, "events"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    let eventarray = [];
    querySnapshot.forEach((doc) => {
      setEvents(() => {
        eventarray.push({ ...doc.data(), _id: doc.id });
        return eventarray;
      });
    });
  };

  // Get rsvps
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

  // decreament tickets available by 1 after reservation
  const decrementTickets = async (event_id) => {
    const eventRef = collection(db, "events");
    const eventDoc = await getDocs(eventRef);
    eventDoc.forEach((doc) => {
      if (doc.id === event_id) {
        updateDoc(doc.ref, {
          no_of_tickets: doc.data().no_of_tickets - 1,
        });
      }
    });
  };

  // Add rsvp
  const addRsvp = async (event_id) => {
    const rsvpsRef = collection(db, "rsvps");
    const rsvp = {
      user_id: currentUser.uid,
      event_id,
    };
    try {
      await addDoc(rsvpsRef, rsvp);
      decrementTickets(event_id);
      getEvents();
      toast.success("Event reserved successfully");
      getRsvps();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // count the no of reservation for a particular event

  const countRsvp = (event_id) => {
    return userEvents.filter((rsvp) => rsvp.event_id === event_id).length;
  };

  const value = {
    currentUser,
    setCurrentUser,
    events,
    setEvents,
    is_admin,
    getEvents,
    getRsvps,
    userEvents,
    setUserEvents,
    addRsvp,
    countRsvp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
