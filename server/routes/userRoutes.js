const express = require("express");
const { register, login, getUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/getData", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
