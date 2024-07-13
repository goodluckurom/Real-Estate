const Listing = require("../model/listing.model");
const { errorHandler } = require("../utils/error");

exports.createListing = async (req, res, next) => {
  console.log("Create listing route reached");
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new errorHandler(404, "Listing not found!..."));
  }

  if (req.user.id !== listing.userRef) {
    return next(new errorHandler(401, "Unauthorized to delete"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new errorHandler(404, "Listing not found!..."));
  }

  if (req.user.id !== listing.userRef) {
    return next(new errorHandler(401, "Unauthorized to update"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new errorHandler(404, "Listing not found!.."));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
