const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

//Index Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing));

  //New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Update Route
router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing))
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Delete Route
router
module.exports= router;