// Vercel/local `npm run build` se pehle apne aap chalta hai (npm "prebuild" hook).
//  1) Profile ka snapshot save karta hai  -> Hero backend ke bina bhi turant dikhta hai
//  2) sitemap.xml banata hai (static pages + projects + articles + career)
// Kuch bhi fail ho to build kabhi nahi rukti: purani snapshot file use hoti hai.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const API = (
  process.env.VITE_BACKEND_URL || "https://mern-portfolio-backend-ke5j.onrender.com"
).replace(/\/+$/, "");
const SITE_URL = "https://rajankumarsingh.me";

const SNAPSHOT_FILE = path.join(ROOT, "src", "data", "profile.snapshot.json");
const SITEMAP_FILE = path.join(ROOT, "public", "sitemap.xml");

const STATIC_ROUTES = ["/", "/projects", "/skills", "/about", "/contact", "/articles", "/career"];

// Snapshot me sirf public fields jaayenge (phone, email, tokens kabhi nahi)
const PUBLIC_FIELDS = [
  "fullName",
  "aboutMe",
  "avatar",
  "resume",
  "portfolioURL",
  "githubURL",
  "linkedInURL",
  "instagramURL",
  "facebookURL",
  "twitterURL",
];

async function getJson(url, attempts = 2) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) }); // Render cold start ke liye 60s
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[prebuild] ${url} failed (try ${i}/${attempts}): ${err.message}`);
    }
  }
  return null;
}

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const day = (value) => {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
};

async function buildSnapshot() {
  const data = await getJson(`${API}/api/v1/user/portfolio/me`);

  if (data?.user) {
    const user = {};
    for (const key of PUBLIC_FIELDS) {
      if (data.user[key] !== undefined) user[key] = data.user[key];
    }
    await mkdir(path.dirname(SNAPSHOT_FILE), { recursive: true });
    await writeFile(SNAPSHOT_FILE, JSON.stringify({ user }, null, 2) + "\n");
    console.log("[prebuild] profile snapshot updated");
    return;
  }

  try {
    await readFile(SNAPSHOT_FILE);
    console.log("[prebuild] API unreachable — purani snapshot rakh li");
  } catch {
    await mkdir(path.dirname(SNAPSHOT_FILE), { recursive: true });
    await writeFile(SNAPSHOT_FILE, JSON.stringify({ user: null }, null, 2) + "\n");
    console.log("[prebuild] API unreachable — khaali snapshot bana di");
  }
}

async function buildSitemap() {
  const [projects, articles, careers] = await Promise.all([
    getJson(`${API}/api/v1/project/getall`),
    getJson(`${API}/api/v1/article/all`),
    getJson(`${API}/api/v1/career/all`),
  ]);

  const entries = [
    ...STATIC_ROUTES.map((p) => ({
      loc: p,
      lastmod: day(),
      priority: p === "/" ? "1.0" : "0.8",
    })),
    ...(projects?.projects || [])
      .filter((x) => x?._id)
      .map((x) => ({ loc: `/project/${x._id}`, lastmod: day(x.updatedAt || x.createdAt), priority: "0.7" })),
    ...(articles?.articles || [])
      .filter((x) => x?.slug)
      .map((x) => ({ loc: `/article/${x.slug}`, lastmod: day(x.updatedAt || x.createdAt), priority: "0.6" })),
    ...(careers?.opportunities || [])
      .filter((x) => x?.slug)
      .map((x) => ({ loc: `/career/${x.slug}`, lastmod: day(x.updatedAt || x.createdAt), priority: "0.6" })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n    <loc>${escapeXml(SITE_URL + (e.loc === "/" ? "/" : e.loc))}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n    <priority>${e.priority}</priority>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  await mkdir(path.dirname(SITEMAP_FILE), { recursive: true });
  await writeFile(SITEMAP_FILE, xml);
  console.log(`[prebuild] sitemap.xml updated (${entries.length} URLs)`);
}

try {
  await buildSnapshot(); // pehle profile: ye Render ko jaga deta hai
  await buildSitemap();
} catch (err) {
  console.warn("[prebuild] skipped:", err.message);
}
process.exit(0);