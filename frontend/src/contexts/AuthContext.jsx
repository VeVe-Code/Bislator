import axios from "../helpers/axios";
import { createContext, useEffect, useReducer } from "react";

// 1️⃣ Create context
let AuthContext = createContext();

// 2️⃣ Reducer to handle login/logout
let AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Store admin info in localStorage
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
      return { admin: action.payload.admin };
    case "LOGOUT":
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      console.log("action hit logout");
      return { admin: null };
    default:
      return state;
  }
};

// 3️⃣ AuthContext provider
let AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, { admin: null });

  // 4️⃣ Fetch admin info on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      try {
        const res = await axios.get("/api/admins/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const admin = res.data;
        if (admin) {
          dispatch({ type: "LOGIN", payload: { admin, token } });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (e) {
        console.error("Failed to fetch admin:", e.response?.data || e.message);
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
