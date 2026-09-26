import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// In-memory cache — Render free tier ek hi instance chalata hai, isliye simple Map kaafi hai.
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export const getLeetCodeStats = catchAsyncErrors(async (req, res, next) => {
  const { username } = req.params;
  if (!username) return next(new ErrorHandler("Username required", 400));

  const cached = cache.get(username);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json(cached.data);
  }

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/${username}/`,
      "User-Agent": "Mozilla/5.0 (portfolio-backend)",
    },
    body: JSON.stringify({
      query: LEETCODE_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    return next(new ErrorHandler("Failed to reach LeetCode", 502));
  }

  const json = await response.json();
  const matchedUser = json?.data?.matchedUser;

  if (!matchedUser) {
    return next(new ErrorHandler("LeetCode user not found", 404));
  }

  const counts = matchedUser.submitStats.acSubmissionNum;
  const find = (d) => counts.find((c) => c.difficulty === d)?.count || 0;

  const result = {
    totalSolved: find("All"),
    easySolved: find("Easy"),
    mediumSolved: find("Medium"),
    hardSolved: find("Hard"),
  };

  cache.set(username, { data: result, ts: Date.now() });

  res.status(200).json(result);
});