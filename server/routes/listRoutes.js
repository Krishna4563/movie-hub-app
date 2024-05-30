const express = require("express");
const List = require("../models/List");
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);

// Create a new list or update an existing one
router.post("/add", auth, async (req, res) => {
  const { name } = req.body; // Assuming the movie title is sent as the name

  try {
    // Check if a list with the same name already exists
    let existingList = await List.findOne({ name });

    if (existingList) {
      // Update the existing list
      existingList.movies.push({ Title: name }); // Assuming the movie title is used as the name for the movie
      await existingList.save();
      res.json(existingList);
    } else {
      // Create a new list
      const newList = new List({
        user: req.user.id,
        name,
        movies: [], // Initially, no movies in the list
      });
      await newList.save();
      res.json(newList);
    }
  } catch (error) {
    console.error("Error adding movie to list:", error);
    res.status(500).send("Server error");
  }
});

// Get all lists for the logged-in user
router.get("/data", auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });
    res.json(lists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
