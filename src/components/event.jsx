import React, { useState, useContext } from "react";
import { Heart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const EventCard = ({ event }) => {
  const { addRsvp, userEvents, countRsvp } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);

  if (countRsvp(event._id) >= 5) {
    setDisabled(true);
    toast.error("Event is full, please try another event");
  }


  
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg w-full max-w-[350px] mx-auto">
      <div className="relative w-full h-[200px] bg-gray-300 rounded-md">
        <img
          src={event.poster_url}
          alt={event.title}
          className="w-full h-full object-cover rounded-md"
        />

        {event.is_vip && (
          <span className="bg-[#a2f704] text-white p-1 rounded-md absolute top-2 right-2 w-14 h-10 flex items-center justify-center">
            VIP
          </span>
        )}

        {countRsvp(event._id) > 0 && (
          <span className="bg-[#a3a0d6] text-white p-1 rounded-md absolute top-2 left-2 w-fit h-10 flex items-center justify-center ">
            {countRsvp(event._id)} RSVP
          </span>
        )}
      </div>

      <div className="flex justify-between">
        <span className="text-[#435585]">{event.date}</span>
        <span className="text-[#435585]">Time: {event.time}</span>
      </div>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-[#435585]">{event.location}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#435585]">Price: {event.price}</span>
        <span className="text-[#435585]">
          Tickets available: {event.no_of_tickets}{" "}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <button className="p-2 bg-red-500 text-white rounded-md">
          <Heart />
        </button>
        <button
          disabled={disabled}
          onClick={() => addRsvp(event._id)}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          RSVP
        </button>
      </div>
    </div>
  );
};

export default EventCard;
