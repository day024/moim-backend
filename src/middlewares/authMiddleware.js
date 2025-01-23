//authMiddlewars.js
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
