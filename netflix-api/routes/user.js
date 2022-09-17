const express = require("express");
const router = express.Router();
const { addToLikeMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/userController");

router.post("/add", addToLikeMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);

module.exports = router;
