const express = require("express");
const List = require("../models/List");
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);

router.post("/add", auth, async (req, res) => {
  const { name } = req.body;

  try {
    let existingList = await List.findOne({ name });

    if (existingList) {
      existingList.movies.push({ Title: name });
      await existingList.save();
      res.json(existingList);
    } else {
      const newList = new List({
        user: req.user.id,
        name,
        movies: [],
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
