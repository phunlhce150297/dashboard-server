const express = require("express");
const route = express.Router();
const User = require("../controllers/user.controller");

// [POST] LOGIN
route.post("/login", User.login);

// [POST] REGISTER
// route.post("/register", User.register);

module.exports = route;
