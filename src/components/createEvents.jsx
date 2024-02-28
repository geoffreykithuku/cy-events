// event creation form using tailwindcss and react

import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    poster_url: "",
    is_vip: false,
    price: 0,
    no_of_tickets: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    event.poster_url = event.poster_url || "https://source.unsplash.com/random";

    try {
      const docRef = await addDoc(collection(db, "events"), event);
      console.log("Document written with ID: ", docRef.id);

      toast.success("Event created successfully");
    } catch (error) {
      toast.error("Error creating event: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-[#435585] py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Create Event</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            placeholder="Date"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            placeholder="Time"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="poster_url"
            value={event.poster_url}
            onChange={handleChange}
            placeholder="Poster URL (optional)"
            className="p-2 rounded-md border border-gray-300"
          />
          <div className="flex gap-4 items-center w-full">
            <label htmlFor="is_vip">VIP</label>
            <input
              type="checkbox"
              name="is_vip"
              value={event.is_vip}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-5 w-full">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={event.price}
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
              value={event.no_of_tickets}
              onChange={handleChange}
              placeholder="No of Tickets"
              className="p-2 rounded-md border border-gray-300 w-full"
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
