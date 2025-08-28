import axios from "../helpers/axios";
import { createContext, useEffect, useReducer } from "react";

// Create context
let AuthContext = createContext();

// Reducer to handle login/logout
let AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("admin", JSON.stringify(action.payload));
      return { admin: action.payload };
    case "LOGOUT":
      localStorage.removeItem("admin");
      localStorage.removeItem("token"); // remove token if stored
      console.log("action hit logout");
      return { admin: null };
    default:
      return state;
  }
};

// AuthContext Provider
let AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, {
    admin: null,
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token"); // get token from localStorage
      if (!token) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      try {
        const res = await axios.get("/api/admins/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const admin = res.data;
        if (admin) {
          dispatch({ type: "LOGIN", payload: admin });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (e) {
        // Axios error handling
        console.error(
          "Failed to fetch admin:",
          e.response?.data?.message || e.message
        );
        dispatch({ type: "LOGOUT" });
      }
    };

    fetchAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
