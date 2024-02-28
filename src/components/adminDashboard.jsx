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

const AdminDashboard = () => {
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

  return (
    <div className="w-full px-5">
      {currentUser && (
        <h1 className="text-3xl font-bold text-[#363062] mb-5">
          Welcome {currentUser.email}
        </h1>
      )}
      {/* display a table with event id title description button to edit button to delete */}
      <table className="w-full">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            return (
              <tr key={index}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>
                  <button className="bg-blue-500 text-white p-2 rounded-md">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
