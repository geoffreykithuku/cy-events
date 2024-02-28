import React, { useContext, useEffect } from "react";
import { FilePenLine, Trash2 } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { events, setEvents, is_admin } = useContext(AuthContext);

  const getEvents = async () => {
    const q = query(collection(db, "events"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    let eventarray = [];
    querySnapshot.forEach((obj) => {
      setEvents(() => {
        eventarray.push({ ...obj.data(), _id: obj.id });
        return eventarray;
      });
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleDelete = async (id) => {
    const eventRef = doc(db, "events", id);
    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        await deleteDoc(eventRef);
        toast.success("Document successfully deleted");
        setEvents((prev) => prev.filter((event) => event._id !== id));
      }
    } catch (e) {
      toast.error("Error removing document: ", e);
    }
  };

  return (
    <div className="w-full px-5">
      {is_admin && (
        <>
          <h1 className="text-center text-3xl font-bold text-[#435585] my-5">
            Admin Dashboard
          </h1>
          <p className="text-xl max-w-90vh w-full mx-auto text-[#435585] text-center">
            Welcome to the Admin Dashboard. Here, you have the power to
            seamlessly view, edit, and delete events. Explore the possibilities
            and effortlessly manage your event data with just a few clicks.
          </p>
        </>
      )}
      <div className="w-full overflow-x-scroll">
        <table className="w-full mx-auto table-auto mt-10">
          <thead className="bg-[#8fa7eb] text-white text-lg font-semibold table-auto">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Maximum attendees</th>
              <th>Location</th>
              <th>Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="mt-5 font-light text-[#363062] w-full">
            {events.map((event, index) => {
              return (
                <tr
                  key={index}
                  className="text-center mt-3 text-[#363062] font-light hover:bg-gray-200 duration-300 border-b text-sm w-full"
                >
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.no_of_tickets}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>{event.price}</td>

                  <td className="flex gap-5 flex-wrap items-center justify-center ">
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="bg-blue-500 text-white p-2 rounded-md"
                    >
                      <FilePenLine size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
