const express = require("express");
const router = express.Router();
const {
  getPublicList,
  addItemPublic,
  updateItemPublic,
  buyItemPublic,
  deleteItemPublic,
} = require("../controllers/publicController");

router.route("/:id").get(getPublicList);
router.route("/additem/:id").put(addItemPublic);
router.route("/updateitem/:id").put(updateItemPublic);
router.route("/buyitem/:id").put(buyItemPublic);
router.route("/deleteitem/:id").put(deleteItemPublic);
module.exports = router;
