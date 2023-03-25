const express = require("express");
const router = express.Router();
const {
  getSharedLists,
  getSharedList,
  addItemShared,
  updateItemShared,
  buyItemShared,
  deleteItemShared,
} = require("../controllers/sharedController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").put(protect, getSharedLists);
router.route("/:id").put(protect, getSharedList);
router.route("/additem/:id").put(addItemShared);
router.route("/deleteitem/:id").put(deleteItemShared);
router.route("/updateitem/:id").put(updateItemShared);
router.route("/buyitem/:id").put(buyItemShared);

module.exports = router;
