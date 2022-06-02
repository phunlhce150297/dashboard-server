const Account = require("../models/account.model");

module.exports = (req, res, next) => {
  Account.count({}, (err, count) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error!");
    }
    res.header("Content-Range", `accounts 1-${count}/${count}`);
    next();
  });
};
