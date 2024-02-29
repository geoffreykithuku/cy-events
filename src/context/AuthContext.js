import { createContext, useCallback, useRef, useEffect, useState } from "react";
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
import emailjs from "@emailjs/browser";

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
      setLoading(false);
    });
  };

  // Get rsvps
  const getRsvps = async () => {
    setLoading(true);
    const rsvpsRef = collection(db, "rsvps");
    const q = query(rsvpsRef, where("user_id", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    let eventarray = [];
    querySnapshot.forEach((doc) => {
      eventarray.push({ ...doc.data(), _id: doc.id });
    });
    setUserEvents(eventarray);
    setLoading(false);
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

  // Send email

  const sendEmail = async (form) => {
    console.log(form);
    await emailjs
      .send("service_8yd07yr", "template_smh1c4e", form, "gAShCxizR1U0Ba5AE")
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
          toast.error("Error sending email");
        }
      );
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

      toast.success("Event reserved successfully");
      await sendEmail({
        event_name: events.find((event) => event._id === event_id).title,
        event_date: events.find((event) => event._id === event_id).date,
        event_location: events.find((event) => event._id === event_id).location,
        event_time: events.find((event) => event._id === event_id).time,
        to_email: currentUser.email,
      });
      //window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // count rsvp
  const countRsvp = (event_id) => {
    const rsvp = userEvents.filter((rsvp) => rsvp.event_id === event_id);
    return rsvp.length;
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
