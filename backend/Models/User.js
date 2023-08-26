const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  places: [{ type: String }],
});

module.exports = model("User", schema);
