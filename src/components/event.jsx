import React, { useState } from "react";
import { Heart } from "lucide-react";

const EventCard = ({ event }) => {
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
        <button className="p-2 text-white rounded-md">
          <Heart color="#ff0000" />
        </button>

        <select
          name="no_of_tickets"
          id="no_of_tickets"
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button className="p-2 bg-blue-500 text-white rounded-md">RSVP</button>
      </div>
    </div>
  );
};

export default EventCard;
