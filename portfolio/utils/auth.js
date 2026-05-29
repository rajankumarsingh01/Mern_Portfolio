import { auth } from "../src/firebase";

/**
 * Always returns a fresh Firebase ID token.
 * Firebase auto-refreshes if expired (token valid for 1 hour).
 * Returns null if user is not logged in.
 */
export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    // forceRefresh = false → uses cached token if still valid
    const token = await user.getIdToken(false);
    return token;
  } catch (err) {
    console.log("❌ Token fetch error:", err.message);
    return null;
  }
};

/**
 * Check if a user is currently logged in.
 */
export const isLoggedIn = () => {
  return !!auth.currentUser;
};