const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Payment = require("../models/Payment");

/**
 * @route POST /user/create
 */

router.post("/addCard/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, cardNumber, cvv, expDate } = req.body;
  if (cardNumber.toString().length != 10) {
    return res.status(400).send({ code: 400, msg: "Invalid card number" });
  }
  try {
    const card = await Payment.create({
      user: userId,
      name,
      cardNumber,
      cvv,
      expDate,
    });
    await card.save();
    res.send({ msg: "Card added!", card });
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

module.exports = router;
