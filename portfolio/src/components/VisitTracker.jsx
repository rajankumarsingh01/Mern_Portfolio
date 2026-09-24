import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/config/api";

// Har page ko ek session me sirf ek baar track karta hai.
// Apni visits band karne ke liye browser console me chalao: localStorage.setItem("noTrack", "1")
const VisitTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      if (localStorage.getItem("noTrack") === "1") return;
      const key = `tracked:${pathname}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch (e) {
      // storage blocked ho to bhi track kar lo
    }

    axios
      .post(`${API_URL}/api/v1/visitor/track`, { page: pathname })
      .catch(() => {});
  }, [pathname]);

  return null;
};

export default VisitTracker;