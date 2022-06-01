const express = require("express");
const route = express.Router();
const accountController = require("../controllers/account.controller");

// [GET] get all account in DB
route.get("", accountController.getAll);

// [GET] get an account by id
route.get("/:id", accountController.getOne);

// [POST] create an account
route.post("/create", accountController.create);

// [PUT] update an account by id
route.put("/update/:id", accountController.update);

// [DELETE] delete an account by id
route.delete("/delete/:id", accountController.delete);

module.exports = route;
