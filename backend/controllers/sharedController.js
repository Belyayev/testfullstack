const asyncHandler = require("express-async-handler");

const List = require("../models/listModel");

// @desc    Get shared lists
// @route   GET /api/shared/
// @access  Private
const getSharedLists = asyncHandler(async (req, res) => {
  const lists = await List.find({
    "sharedWith.email": req.body.email,
  });
  res.status(200).json(lists);
});

// @desc    Get shared list
// @route   PUT /api/shared/getsharedlist/:id
// @access  Private
const getSharedList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (
    list.sharedWith.length > 0 &&
    list.sharedWith.some((share) => share.email === req.body.email)
  ) {
    res.status(200).json(list);
  } else {
    res.status(401);
    throw new Error("User not authorized");
  }
});

// @desc    Add item shared
// @route   PUT /api/shared/additem/:id
// @access  Private
const addItemShared = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.sharedWith.some((share) => share.email === req.body.email)) {
    res.status(200).json(list);
  } else {
    res.status(401);
    throw new Error("User not authorized");
  }

  list.items.splice(0, 0, req.body);

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Delete item shared
// @route   PUT /api/shared/deleteitem/:id
// @access  Private
const deleteItemShared = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.sharedWith.some((share) => share.email === req.body.email)) {
    res.status(200).json(list);
  } else {
    res.status(401);
    throw new Error("User not authorized");
  }

  let item = await list.items.filter(
    (item) => item._id.toString() === req.body.itemId
  );

  if (item.length < 1) {
    res.status(400);
    throw new Error("Item not found");
  }

  list.items.splice(
    list.items.findIndex((i) => i._id.toString() === req.body.itemId),
    1
  );

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Update item shared
// @route   PUT /api/shared/updateitem/:id
// @access  Private
const updateItemShared = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.sharedWith.some((share) => share.email === req.body.email)) {
    res.status(200).json(list);
  } else {
    res.status(401);
    throw new Error("User not authorized");
  }

  let item = await list.items.filter(
    (item) => item._id.toString() === req.body.itemId
  );

  if (item.length < 1) {
    res.status(400);
    throw new Error("Item not found");
  }

  itemIndex = list.items.findIndex(
    (item) => item._id.toString() === req.body.itemId
  );

  list.items[itemIndex].itemName = req.body.itemName;
  list.items[itemIndex].quantity = req.body.quantity;
  list.items[itemIndex].isle = req.body.isle;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Buy item shared
// @route   PUT /api/shared/buyitem/:id
// @access  Private
const buyItemShared = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.sharedWith.some((share) => share.email === req.body.email)) {
    res.status(200).json(list);
  } else {
    res.status(401);
    throw new Error("User not authorized");
  }

  let item = await list.items.filter(
    (item) => item._id.toString() === req.body.itemId
  );

  if (item.length < 1) {
    res.status(400);
    throw new Error("Item not found");
  }

  itemIndex = list.items.findIndex(
    (item) => item._id.toString() === req.body.itemId
  );

  list.items[itemIndex].isBought = !list.items[itemIndex].isBought;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

module.exports = {
  getSharedLists,
  getSharedList,
  addItemShared,
  updateItemShared,
  buyItemShared,
  deleteItemShared,
};
