const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const expressAsyncHandler = require("express-async-handler");

class UserController {
  /**
   * login behavior
   * @param {*} req
   * @param {*} res
   */
  login = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      !user &&
        res.status(401).send({ message: "Wrong user, please check again!!" });

      const bytes = CryptoJS.AES.decrypt(user.password, "yelp");
      const originPassword = bytes.toString(CryptoJS.enc.Utf8);

      originPassword !== password &&
        res.status(401).send({ message: "Wrong password, please try again!!" });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log("login failed");
    }
  });

  /**
   * register behavior
   * @param {*} req
   * @param {*} res
   */
  register = expressAsyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    try {
      const userExist = await User.findOne({ username });
      if (userExist !== null) {
        res.status(400).send({ message: "Username does exist." });
      }

      const newUser = new User({
        name,
        username,
        password: CryptoJS.AES.encrypt(password, "yelp").toString(),
      });

      const user = await newUser.save();
      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(500).json(error);
      console.log("Register failed");
      return;
    }
  });
}

module.exports = new UserController();
