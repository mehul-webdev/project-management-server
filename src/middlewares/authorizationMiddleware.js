const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res
        .status(401)
        .json({ isLoggedIn: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    // Attach user info to request
    req.user = {
      email: decoded.email,
      name: decoded.name,
      id: decoded.id,
    };

    next();
  } catch (err) {
    res.status(401);
    next(err);
  }
};

module.exports = {
  validateToken,
};
