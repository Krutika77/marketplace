const express = require("express");
const connectDB = require("./db/connectDB");
require("dotenv").config();

const PORT = 3000;

const app = express();

connectDB();

//middleware
app.use(express.json({ extended: false }));

//require routers
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");

// set routes
app.use("/user", user);
app.use("/product", product);
app.use("/payment", payment);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
