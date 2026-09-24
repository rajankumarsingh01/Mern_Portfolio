// Project card jaisi jagah pe dark placeholder (via.placeholder.com unreliable hai)
export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#111c2e"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><text x="300" y="210" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#4ade80">Preview coming soon</text></svg>`
  );

// Cloudinary image ko auto format (WebP/AVIF), auto quality aur chhoti width me convert karta hai
export const optimizeImage = (url, width = 800) => {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*(f_auto|q_auto|w_\d+)/.test(url)) return url; // pehle se optimized
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};