const User = require("../models/userSchema");

module.exports.addToLikeMovies = async (req, res, next) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (movieAlreadyLiked) {
        return res.json({ success: false, msg: "Movie already liked." });
      }
      await User.findByIdAndUpdate(user._id, { likedMovies: [...likedMovies, data] }, { new: true });
      return res.json({ success: true, msg: "Add movie successfully" });
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({ success: true, msg: "Add movie successfully" });
    }
  } catch (err) {
    return res.json({ success: false, msg: `Server error: ${err}` });
  }
};

module.exports.getLikedMovies = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: true, movies: user.likedMovies });
    }
    return res.json({ success: false, msg: "User not found" });
  } catch (err) {
    return res.json({ success: false, msg: `Server error: ${err}` });
  }
};

module.exports.removeFromLikedMovies = async (req, res, next) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const newMovies = likedMovies.filter(({ id }) => id !== movieId);
      await User.findByIdAndUpdate(user._id, { likedMovies: newMovies }, { new: true });
      return res.json({ success: true, movies: newMovies, msg: "Movie removed successfully" });
    }
    return res.json({ success: false, msg: "User not found" });
  } catch (err) {
    return res.json({ success: false, msg: `Server error: ${err}` });
  }
};
