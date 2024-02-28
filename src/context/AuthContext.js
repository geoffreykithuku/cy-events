import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  collection,
  getDocs,
  query,

  orderBy,

} from "firebase/firestore";

import { db } from "../firebase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
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

  const value = {
    currentUser,
    setCurrentUser,
    events,
    setEvents,
    is_admin,
    getEvents,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
