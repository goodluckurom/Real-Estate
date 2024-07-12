const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;

// https://vppxq7g4-8000.uks1.devtunnels.ms/
