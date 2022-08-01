const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  let token = req.header("authorization");
  if (token) {
    token = token.replace("Bearer ", "");
  } else {
    return res.status(401).send({ code: 401, msg: "please authenticate" });
  }
  const decoded = jwt.verify(token, "Secret");
  try {
    const user = await User.findById(decoded.user.id);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(500).send({ code: 500, msg: "server error" });
  }
};

module.exports = auth;
