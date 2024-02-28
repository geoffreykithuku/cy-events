// a user can only book a maximum of 5 tickets
// a user can rsvp for an event if he/she is authenticated
// a user can only like an event once and can unlike an event and only if he/she is authenticated
// if a user is an admin, he/she can create an event, edit an event and delete an event
// all the data is stored in firestore and the user authentication is done with firebase.
// admin email is admin@admin.com
// admin password is admin
// if the current user.email is equal to admin email, then the user is an admin else the user is not an admin
// if the user is an admin, the user can create an event, edit an event and delete an event


// this is the context for managing events, updating , handling clicks etc

import React, { createContext, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const value = {
        events,
        setEvents,
        loading,
        setLoading,
    };

    // handle like and unlike
    // handle rsvp and count if the user has reached maximum of 5 tickets for that event
    // handle create event
    // handle edit event
    // handle delete event

    
    return (
        <EventContext.Provider value={value}>{children}</EventContext.Provider>
    );
}
    
