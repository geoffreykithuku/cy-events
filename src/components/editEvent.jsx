import React, { useState, useContext } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const { events, setEvents } = useContext(AuthContext);
  const event = events.find((event) => event._id === id);
  const [newEvent, setNewEvent] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventRef = doc(db, "events", id);
    try {
      await updateDoc(eventRef, newEvent);

      setEvents((prev) => {
        return prev.map((event) => {
          if (event._id === id) {
            return newEvent;
          }
          return event;
        });
      });
        toast.success("Document successfully updated");
        navigate("/admin-dashboard");
    } catch (e) {
      toast.error("Error updating document: ", e);
    }
  };

  console.log(event);

  return (
    <div className="flex justify-center items-center h-screen text-[#435585] py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Edit Event</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            placeholder="Date"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleChange}
            placeholder="Time"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="poster_url"
            value={newEvent.poster_url}
            onChange={handleChange}
            placeholder="Poster URL"
            className="p-2 rounded-md border border-gray-300"
          />
          <div className="flex gap-4 items-center w-full">
            <label htmlFor="is_vip">VIP</label>
            <input
              type="checkbox"
              name="is_vip"
              value={newEvent.is_vip}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-5 w-full">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={newEvent.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-2 rounded-md border border-gray-300 w-full"
            />
          </div>

          <div className="flex items-center gap-5 w-full">
            <label htmlFor="no_of_tickets">No of Tickets</label>
            <input
              id="no_of_tickets"
              type="number"
              name="no_of_tickets"
              value={newEvent.no_of_tickets}
              onChange={handleChange}
              placeholder="No of Tickets"
              className="p-2 rounded-md border border-gray-300 w-full"
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
