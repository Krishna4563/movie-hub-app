const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, username: 1 });

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    const usernames = users.map((user) => user.username);

    res.json(usernames);
    console.log(usernames);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "User already exists / Invalid Credentials" });

    const newUser = new User({ username, email, password });

    await newUser.save();

    const payload = { user: { id: newUser.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "New User created successfully !", token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "User Logged In successfully !", token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { register, login, getUsers };
