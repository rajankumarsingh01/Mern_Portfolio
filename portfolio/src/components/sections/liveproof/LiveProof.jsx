import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, ExternalLink } from "lucide-react";
import { SITE } from "@/config/site";

import { API_URL } from "@/config/api";

const CACHE_TTL = 1000 * 60 * 30; // 30 min

// sessionStorage-backed cache — API rate-limits se bachne ke liye
const cachedFetch = async (key, url) => {
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch {}

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();

  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {}

  return data;
};

const getGithubUsername = () => {
  try {
    return new URL(SITE.github).pathname.replace(/\//g, "");
  } catch {
    return "";
  }
};

// ── GitHub Card ──────────────────────────────────────────────────────────
const GithubCard = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    const username = getGithubUsername();
    if (!username) {
      setStatus("error");
      return;
    }

    Promise.all([
      cachedFetch(`gh-user-${username}`, `https://api.github.com/users/${username}`),
      cachedFetch(
        `gh-repos-${username}`,
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      ),
    ])
      .then(([userData, repoData]) => {
        setUser(userData);
        setRepos(Array.isArray(repoData) ? repoData : []);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "error") {
    return (
      <div className="live-card">
        <p className="live-card-error">GitHub stats abhi load nahi ho paaye — direct profile dekho.</p>
        <a href={SITE.github} target="_blank" rel="noreferrer" className="live-card-link">
          View on GitHub <ExternalLink size={13} />
        </a>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="live-card live-card-skeleton" />;
  }

  return (
    <div className="live-card">
      <div className="live-card-head">
        <img src={user.avatar_url} alt={user.login} className="live-avatar" />
        <div>
          <p className="live-card-title">
            <Github size={15} /> {user.login}
          </p>
          <p className="live-card-sub">{user.bio || "Full Stack Developer"}</p>
        </div>
      </div>

      <div className="live-stat-row">
        <div className="live-stat">
          <span className="live-stat-num">{user.public_repos}</span>
          <span className="live-stat-label">Repos</span>
        </div>
        <div className="live-stat">
          <span className="live-stat-num">{user.followers}</span>
          <span className="live-stat-label">Followers</span>
        </div>
        <div className="live-stat">
          <span className="live-stat-num">{user.following}</span>
          <span className="live-stat-label">Following</span>
        </div>
      </div>

      {repos.length > 0 && (
        <div className="live-repo-list">
          {repos.slice(0, 4).map((r) => (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="live-repo-row">
              <span className="live-repo-name">{r.name}</span>
              <span className="live-repo-meta">
                <Star size={11} /> {r.stargazers_count}
                <GitFork size={11} style={{ marginLeft: 8 }} /> {r.forks_count}
              </span>
            </a>
          ))}
        </div>
      )}

      <a href={SITE.github} target="_blank" rel="noreferrer" className="live-card-link">
        View full profile <ExternalLink size={13} />
      </a>
    </div>
  );
};

// ── LeetCode Card ────────────────────────────────────────────────────────
const LeetCodeCard = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!SITE.leetcode) {
      setStatus("skip");
      return;
    }
    cachedFetch(
      `lc-${SITE.leetcode}`,
      `${API_URL}/api/v1/leetcode/${SITE.leetcode}`
    )
      .then((data) => {
        if (typeof data.totalSolved !== "number") throw new Error("not found");
        setStats(data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "skip") return null;

  if (status === "error") {
    return (
      <div className="live-card">
        <p className="live-card-error">LeetCode stats abhi load nahi ho paaye.</p>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="live-card live-card-skeleton" />;
  }

  return (
    <div className="live-card">
      <p className="live-card-title">🧩 LeetCode</p>
      <div className="live-stat-row">
        <div className="live-stat">
          <span className="live-stat-num" style={{ color: "#4ade80" }}>{stats.totalSolved}</span>
          <span className="live-stat-label">Solved</span>
        </div>
        <div className="live-stat">
          <span className="live-stat-num" style={{ color: "#facc15" }}>{stats.easySolved}</span>
          <span className="live-stat-label">Easy</span>
        </div>
        <div className="live-stat">
          <span className="live-stat-num" style={{ color: "#fb923c" }}>{stats.mediumSolved}</span>
          <span className="live-stat-label">Medium</span>
        </div>
        <div className="live-stat">
          <span className="live-stat-num" style={{ color: "#f87171" }}>{stats.hardSolved}</span>
          <span className="live-stat-label">Hard</span>
        </div>
      </div>
      
       <a href={`https://leetcode.com/${SITE.leetcode}`}
        target="_blank"
        rel="noreferrer"
        className="live-card-link"
      >
        View profile <ExternalLink size={13} />
      </a>
    </div>
  );
};

const LiveProof = () => (
  <section className="w-full max-w-7xl mx-auto py-20 px-6">
    <style>{`
      .live-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px;display:flex;flex-direction:column;gap:14px;}
      .live-card-skeleton{min-height:180px;background:rgba(255,255,255,.03);animation:pulse 1.5s ease-in-out infinite;}
      @keyframes pulse{0%,100%{opacity:.5}50%{opacity:.9}}
      .live-card-head{display:flex;align-items:center;gap:12px;}
      .live-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;}
      .live-card-title{display:flex;align-items:center;gap:6px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:#fff;margin:0;}
      .live-card-sub{font-size:11.5px;color:rgba(255,255,255,.4);margin:2px 0 0;font-family:'JetBrains Mono',monospace;}
      .live-stat-row{display:flex;gap:18px;}
      .live-stat{display:flex;flex-direction:column;gap:2px;}
      .live-stat-num{font-size:20px;font-weight:700;font-family:'Syne',sans-serif;color:#4ade80;}
      .live-stat-label{font-size:9.5px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.08em;font-family:'JetBrains Mono',monospace;}
      .live-repo-list{display:flex;flex-direction:column;gap:6px;border-top:1px solid rgba(255,255,255,.06);padding-top:12px;}
      .live-repo-row{display:flex;justify-content:space-between;align-items:center;text-decoration:none;padding:5px 0;}
      .live-repo-name{font-size:12.5px;color:rgba(255,255,255,.7);font-family:'JetBrains Mono',monospace;}
      .live-repo-meta{display:flex;align-items:center;font-size:11px;color:rgba(255,255,255,.35);font-family:'JetBrains Mono',monospace;}
      .live-card-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#4ade80;text-decoration:none;font-family:'JetBrains Mono',monospace;margin-top:auto;}
      .live-card-error{font-size:12.5px;color:rgba(255,255,255,.4);}
    `}</style>

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        Live <span className="text-green-500">Proof</span>
      </h2>
      <p className="text-sm text-gray-500 mt-3">Real-time stats, not screenshots.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <GithubCard />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
        <LeetCodeCard />
      </motion.div>
    </div>
  </section>
);

export default LiveProof;