// Backend URL ek hi jagah se.
// Local ya Vercel me VITE_BACKEND_URL set karke override kar sakte ho.
export const API_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  "https://mern-portfolio-backend-ke5j.onrender.com"
).replace(/\/+$/, "");