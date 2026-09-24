import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api";

// Module-level cache: Hero, Navbar aur Terminal ek hi API call share karte hain
let cachedProfile = null;
let inflight = null;

const fetchProfile = () => {
  if (cachedProfile) return Promise.resolve(cachedProfile);

  if (!inflight) {
    inflight = axios
      .get(`${API_URL}/api/v1/user/portfolio/me`, { withCredentials: true })
      .then(({ data }) => {
        cachedProfile = data?.user || null;
        inflight = null;
        return cachedProfile;
      })
      .catch(() => {
        inflight = null;
        return null;
      });
  }

  return inflight;
};

export const useProfile = () => {
  const [profile, setProfile] = useState(cachedProfile);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;

    fetchProfile().then((p) => {
      if (!alive) return;
      if (p) setProfile(p);
      else setFailed(true);
    });

    return () => {
      alive = false;
    };
  }, []);

  return { profile, failed };
};