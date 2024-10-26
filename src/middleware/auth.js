const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // This should contain { adminId: "..." }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token verification failed, authorization denied" });
  }
};

module.exports = auth;