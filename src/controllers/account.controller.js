const Account = require("../models/account.model");
const expressAsyncHandler = require("express-async-handler");

class AccountController {
  /**
   * get all accounts in database
   */
  getAll = expressAsyncHandler(async (req, res) => {
    try {
      const account = await Account.find({});
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  /**
   * get an account in db
   */
  getOne = expressAsyncHandler(async (req, res) => {
    try {
      const accountID = req.params.id;
      const account = await Account.findById(accountID);
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  /**
   * insert one account
   */
  create = expressAsyncHandler(async (req, res) => {
    try {
      const account = req.body;

      const { userName } = req.body;
      const accountExist = await Account.findOne({ userName });
      if (accountExist) {
        res.status(400).json({ msg: "username does exists. Try again!" });
        return;
      }
      const newAccount = new Account(account);
      await newAccount.save();
      res.status(201).json({ message: "create successful" });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  /**
   * Update data
   */
  update = expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const accountUpdate = req.body;

      const accountExist = await Account.findById(id);
      if (!accountExist) {
        res
          .status(400)
          .json({ msg: `The account does not exists. Try again!` });
      }

      await Account.findByIdAndUpdate(id, { $set: accountUpdate });
      res.status(200).json({ message: `update id: ${id} successfull!` });
    } catch (error) {
      console.log("Update failed");
      res.status(500).json(error);
    }
  });

  /**
   * Delete account
   * Con loi
   */
  delete = expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const accountDelete = await Account.findById(id);

      if (accountDelete) {
        await Account.findByIdAndDelete(id);
        res.status(200).json({ msg: "delete successful" });
      } else {
        res
          .status(400)
          .json({ msg: `Failed delete: id: ${id} does not exists.` });
      }
    } catch (error) {
      console.log("error");
      res.status(500).json(error);
    }
  });
}

module.exports = new AccountController();
