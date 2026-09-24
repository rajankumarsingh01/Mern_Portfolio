import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api";
import snapshot from "@/data/profile.snapshot.json";

// Social URL sahi platform ka aur profile path ke saath hona chahiye,
// warna ignore ho jaata hai (generic github.com, galat domain, typo wagera).
const HOSTS = {
  githubURL: ["github.com"],
  linkedInURL: ["linkedin.com"],
  instagramURL: ["instagram.com"],
  facebookURL: ["facebook.com", "fb.com"],
  twitterURL: ["twitter.com", "x.com"],
};

const cleanUrl = (value, hosts) => {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "");
    const okHost = hosts.some((h) => host === h || host.endsWith(`.${h}`));
    const hasPath = url.pathname.replace(/\/+$/, "").length > 0;
    return url.protocol === "https:" && okHost && hasPath ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

const sanitizeProfile = (profile) => {
  if (!profile) return profile;
  const out = { ...profile };
  for (const [key, hosts] of Object.entries(HOSTS)) {
    out[key] = cleanUrl(profile[key], hosts);
  }
  return out;
};

// Build time pe save hui profile: backend so raha ho tab bhi Hero turant dikhta hai
const snapshotProfile = sanitizeProfile(snapshot?.user ?? null);

// Module-level cache: Hero, Navbar aur Terminal ek hi API call share karte hain
let cachedProfile = null; // sirf API se aaya fresh data
let inflight = null;

const fetchProfile = () => {
  if (cachedProfile) return Promise.resolve(cachedProfile);

  if (!inflight) {
    inflight = axios
      .get(`${API_URL}/api/v1/user/portfolio/me`, { withCredentials: true })
      .then(({ data }) => {
        cachedProfile = sanitizeProfile(data?.user) || null;
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
  const [profile, setProfile] = useState(cachedProfile || snapshotProfile);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;

    fetchProfile().then((fresh) => {
      if (!alive) return;
      if (fresh) setProfile(fresh);
      else setFailed(true);
    });

    return () => {
      alive = false;
    };
  }, []);

  return { profile, failed };
};