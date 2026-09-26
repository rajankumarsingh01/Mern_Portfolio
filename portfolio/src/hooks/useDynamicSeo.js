import { useEffect } from "react";

const SITE_URL = "https://rajankumarsingh.me";

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// Detail pages (project/article/career) is hook ko data load hone ke baad
// call karte hain taaki social-share preview (LinkedIn/WhatsApp) real
// title/description/image dikhaye, generic wale nahi.
export const useDynamicSeo = ({ title, description, image }) => {
  useEffect(() => {
    if (!title) return; // data abhi load nahi hua — static SeoManager wala fallback rehne do

    const fullImage = image?.startsWith("http") ? image : `${SITE_URL}${image || "/og-image.png"}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", fullImage);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullImage);
  }, [title, description, image]);
};