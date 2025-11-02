const express = require("express");
const { login, logout } = require("../controller/auth.controller");

const router = express.Router();

router.post("/auth", login);
router.post("/auth/logout", logout);


module.exports = router;
