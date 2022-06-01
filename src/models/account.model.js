const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AccountSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, lowercase: true },
    password: { type: String, default: "" },
    email: { type: String, default: "", lowercase: true },
    passwordEmail: { type: String, default: "" },
    reviewLocation: { type: String, default: "" },
    ipLocation: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
    numFriends: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    numPictures: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now() },
  },
  {
    _id: false,
  }
);

AccountSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Account", AccountSchema);
