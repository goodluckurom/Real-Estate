const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new errorHandler(401, "Unauthorized access..."));

  jwt.verify(token, "process.env.JWT_SECRET", (error, user) => {
    if (error) return next(errorHandler(403, "Forbiden"));

    req.user = user;
    next();
  });
};
