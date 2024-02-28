
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  // a user can only book a maximum of 5 tickets
  // a user can rsvp for an event if he/she is authenticated
  // a user can only like an event once and can unlike an event and only if he/she is authenticated
  // if a user is an admin, he/she can create an event, edit an event and delete an event
  // all the data is stored in firestore and the user authentication is done with firebase.
  // admin email is admin@admin.com
  // admin password is admin
  // if the current user.email is equal to admin email, then the user is an admin else the user is not an admin
  // if the user is an admin, the user can create an event, edit an event and delete an event

  // handle like and unlike
  // handle rsvp and count if the user has reached maximum of 5 tickets for that event
  // handle create event
  // handle edit event
    // handle delete event
    
    
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


