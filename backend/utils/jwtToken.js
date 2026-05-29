







// backend/utils/jwttoken.js
// FIXED: token goes in BOTH cookie (dev) AND response body (prod cross-domain)
// backend/utils/jwttoken.js
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res.cookie("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(statusCode).json({
    success: true,
    message,
    user,
    token,   // ← YEH LINE HONI CHAHIYE
  });
};