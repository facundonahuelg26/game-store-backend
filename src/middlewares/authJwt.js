const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return next(createError(403, "No token provided"));

    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return next(createError(404, "No user found"));

    next();
  } catch (error) {
    next(createError(403, "No authorization"));
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  console.log(roles);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return next(createError(403, "No permits required"));
};

module.exports = {
  verifyToken,
  isAdmin,
};
