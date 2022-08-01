const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../middlewares/auth");

/**
 * @route POST /user/create
 */

router.post("/create", auth, async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const product = new Product({
      user: req.user.id,
      name,
      description,
      price,
      quantity,
    });
    await product.save();
    res.send({ msg: "Product created!", product });
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

// find a product by product id
router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});
// finding all products sold by the same user
router.get("/findall/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const products = await Product.find({ user: userId });
    res.send(products);
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

//find a user by product id
router.get("/findbyproduct/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const user = await Product.findById(productId).populate("user");
    //console.log("product", product);
    // const user = await User.findById(product.user);
    res.send(user);
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

// edit a product using product id
router.patch("/edit/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ code: 404, msg: "Invalid product id" });
    }
    for (let key in req.body) {
      product[key] = req.body[key];
    }
    await product.save();
    res.send({ product });
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

// delete a product by product id
router.delete("/delete/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send({ code: 404, msg: "Invalid product id" });
    }
    res.send({ product, msg: "product deleted!" });
  } catch (error) {
    res.status(500).send({ code: 500, error });
  }
});

module.exports = router;
