const express = require("express");
const router = express.Router();
const {
  getAllLists,
  getList,
  createList,
  updateList,
  sortList,
  groupCheck,
  showBought,
  makePrivate,
  deleteList,
  addItem,
  updateItem,
  buyItem,
  deleteItem,
  addShare,
  deleteShare,
} = require("../controllers/listController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllLists).post(protect, createList);
router
  .route("/:id")
  .get(protect, getList)
  .delete(protect, deleteList)
  .put(protect, updateList);
router.route("/sortlist/:id").put(sortList);
router.route("/groupcheck/:id").put(groupCheck);
router.route("/showbought/:id").put(protect, showBought);
router.route("/makeprivate/:id").put(protect, makePrivate);
router.route("/addshare/:id").put(protect, addShare);
router.route("/deleteshare/:id").put(protect, deleteShare);
router.route("/additem/:id").put(protect, addItem);
router.route("/updateitem/:id").put(protect, updateItem);
router.route("/buyitem/:id").put(protect, buyItem);
router.route("/deleteitem/:id").put(protect, deleteItem);

module.exports = router;
