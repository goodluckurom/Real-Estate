const express = require("express");
const {
  createListing,
  updateListing,
  deleteListing,
  getListing,
} = require("../controllers/listing.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.post("/create-listing", verifyToken, createListing);
router.post("/update-listing", verifyToken, updateListing);
router.delete("/delete-listing", verifyToken, deleteListing);
router.get("/get-listing/:id", getListing);

module.exports = router;
