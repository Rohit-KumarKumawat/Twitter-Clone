const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded.userId) {
      return res.status(401).send({ message: "User ID not found in token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
