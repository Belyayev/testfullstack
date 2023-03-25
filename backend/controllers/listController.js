const mailer = require("../config/mailer");

const asyncHandler = require("express-async-handler");

const List = require("../models/listModel");
// const User = require("../models/userModel");

// @desc    Get all user lists
// @route   GET /api/lists
// @access  Private
const getAllLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
});

// @desc    Get list
// @route   GET /api/lists/:id
// @access  Private
const getList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("list not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(list);
});

// @desc    Create list
// @route   POST /api/lists
// @access  Private
const createList = asyncHandler(async (req, res) => {
  if (!req.body.listName) {
    res.status(401);
    throw new Error("List name is required");
  }

  const list = await List.create({
    listName: req.body.listName,
    user: req.user.id,
    owner: req.user.email,
  });

  res.status(200).json(list);
});

// @desc    Update list
// @route   PUT /api/lists/:id
// @access  Private
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("list not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Toggle showBought items
// @route   PUT /api/showbought/:id
// @access  Private
const showBought = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("list not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if logged in user matches the list or list was shared with user
  if (
    list.user.toString() !== req.user.id &&
    list.sharedWith.some((share) => share.email === req.body.email)
  ) {
    res.status(401);
    throw new Error("User not authorized");
  }

  list.showBought = !list.showBought;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Toggle MakeListPrivate items
// @route   PUT /api/makeprivate/:id
// @access  Private
const makePrivate = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("list not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  list.private = !list.private;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Sort List Items
// @route   PUT /api/lists/sortlist/:id
// @access  Public
const sortList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // To reuse this call for shared and public lists, no user validation is done
  list.items.splice(
    req.body.newIndex,
    0,
    list.items.splice(req.body.oldIndex, 1)[0]
  );

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Check or Uncheck groups
// @route   PUT /api/lists/groupcheck/:id
// @access  Public
const groupCheck = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // To reuse this call for shared and public lists, no user validation is done
  list.groups[req.body.index].isSelected =
    !list.groups[req.body.index].isSelected;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Delete list
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
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

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await list.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Add item
// @route   PUT /api/lists/additem/:id
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(401);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // TODO: Check if logged in user matches the list or list was shared with user
  // this verification fails on shared lists (I think just need !list.sharedWith ... )
  // if (
  //   list.user.toString() !== req.user.id
  //   && list.sharedWith.some((share) => share.email === req.body.email)
  // ) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  list.items.splice(0, 0, req.body);

  if (!list.groups.some((e) => e.group === req.body.isle))
    list.groups.push({ group: req.body.isle });

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Update item
// @route   PUT /api/lists/updateitem/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Check if logged in user matches the list or list was shared with user
  if (
    list.user.toString() !== req.user.id &&
    list.sharedWith.some((share) => share.email === req.body.email)
  ) {
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

  if (!list.groups.some((e) => e.group === req.body.isle))
    list.groups.push({ group: req.body.isle });

  let tempGroup = list.groups.filter(function (value, index, arr) {
    return list.items.some((item) => item.isle === value.group);
  });

  list.groups = tempGroup;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Buy item
// @route   PUT /api/lists/buyitem/:id
// @access  Private
const buyItem = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Check if logged in user matches the list or list was shared with user
  if (
    list.user.toString() !== req.user.id &&
    list.sharedWith.some((share) => share.email === req.body.email)
  ) {
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

// @desc    Delete item
// @route   PUT /api/lists/deleteitem/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Check if logged in user matches the list or list was shared with user
  if (
    list.user.toString() !== req.user.id &&
    list.sharedWith.some((share) => share.email === req.body.email)
  ) {
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

  let tempGroup = list.groups.filter(function (value) {
    return list.items.some((item) => item.isle === value.group);
  });

  list.groups = tempGroup;

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Add share
// @route   POST /api/lists/addshare/:id
// @access  Private
const addShare = asyncHandler(async (req, res) => {
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

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  list.sharedWith.splice(0, 0, req.body);

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  mailer({
    user: req.user,
    email: req.body.email,
    list: updatedList,
    flag: "addshare",
  });

  res.status(200).json(updatedList);
});

// @desc    Delete share
// @route   PUT /api/lists/deleteshare/:id
// @access  Private
const deleteShare = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  let shares = await list.sharedWith.filter(
    (share) => share._id.toString() === req.body.shareId
  );

  if (shares.length < 1) {
    res.status(400);
    throw new Error("Item not found");
  }

  list.sharedWith.splice(
    list.sharedWith.findIndex((i) => i._id.toString() === req.body.shareId),
    1
  );

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

module.exports = {
  getAllLists,
  getList,
  createList,
  sortList,
  groupCheck,
  showBought,
  makePrivate,
  updateList,
  deleteList,
  addItem,
  updateItem,
  buyItem,
  deleteItem,
  addShare,
  deleteShare,
};
