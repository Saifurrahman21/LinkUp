import React, { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
<<<<<<< HEAD
  const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
=======
  const serverUrl = "https://linkup-backend-hv28.onrender.com";
>>>>>>> 37442780c52a9b7dee9e66bb9a6eaf31236dc0ea
  let value = {
    serverUrl,
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
