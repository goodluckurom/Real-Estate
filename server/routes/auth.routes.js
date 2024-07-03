const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  signOut,
  GoogleSignIn,
} = require("../controllers/auth.controller");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-in-with-google", GoogleSignIn);
router.get("/sign-out", signOut);

module.exports = router;
