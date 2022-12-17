const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const functions = require("../utils/functions");

const authentication = functions.authentication;

// routes
router.get("/", controller.welcome);
router.get("/Users", controller.getUsers);
router.get("/Verfication/:token", controller.verify);
router.post("/Register/:type", controller.register);
router.post("/Login/:type", controller.login);
router.put("/Info/:type", authentication, controller.info);

module.exports = router;
