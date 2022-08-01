const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

/**
 * @route POST /user/create
 */

router.post(
  "/create",
  [
    check("name", "Name cannot be empty.").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "password needs to be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, address, email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ code: 400, msg: error.array() });
    }
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ code: 400, msg: "Email taken!" });
      }

      user = new User({ name, address, email, password });

      user.password = await user.encryptPassword(password);

      await user.save();

      res.send({ msg: "User created!", user });
    } catch (error) {
      res.status(500).send({ code: 500, error });
    }
  }
);
// find a user by id
router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ code: 404, msg: "Email does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ code: 401, msg: "Incorrect Email/Password" });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, "Secret", (err, token) => {
      if (err) {
        throw err;
      }
      res.send({ token });
    });

    // res.send(user);
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

// router.get("/profile/:address", (req, res) => {
//   const { address } = req.params;
//   //   let data = {};
//   //   users.forEach((user) => {
//   //     if (user.id === id) {
//   //       data = { ...user };
//   //     }
//   //   });

//   //   const user = users.find((user) => user.address === address); // it only catches the first appearence
//   const user = users.filter((user) => user.address === address); // catches all the appearence where the condition matches

//   res.send(user);
// });

module.exports = router;
