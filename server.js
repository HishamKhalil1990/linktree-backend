"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// variables
const PORT = process.env.PORT;

// create and configure server
const app = express(); // create server (express app)
app.use(bodyParser.json()); // to parse and read json object inside the request
app.use(cors()); // to allow cross origin site
app.listen(PORT, (err) => {
  // to use a port for the server app
  if (err) {
    console.log(err);
  } else {
    console.log("server started");
  }
});

// import routes
const userRouter = require("./routes/userRoute");

// use middleware routes
app.use("/", userRouter);
