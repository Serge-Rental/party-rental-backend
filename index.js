/** @format */

const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const Products = require("./models/products");
const PORT = process.env.PORT || 3005;
const cors = require('cors') 
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());

//test route
app.get("/", (req, res, next) => {
  res.send("Welcome to test route !!");
});

//CRUD routes
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/payment", require("./routes/payments"));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//sync database
sequelize
  .sync()
  .then((result) => {
    console.log("Database connected");
    app.listen(PORT);
    console.log("listening to port:", PORT);
  })
  .catch((err) => console.log(err));
