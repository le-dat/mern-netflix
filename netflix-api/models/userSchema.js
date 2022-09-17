const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, max: 50, required: true, unique: true },
  likedMovies: Array,
});

module.exports = mongoose.model("users", userSchema);
