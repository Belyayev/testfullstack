const asyncHandler = require("express-async-handler");

const List = require("../models/listModel");

// @desc    Get public list
// @route   GET /api/public/:id
// @access  Public
const getPublicList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list || list.private) {
    res.status(400);
    throw new Error("List not found");
  }

  res.status(200).json(list);
});

// @desc    Add item public
// @route   PUT /api/public/additem/:id
// @access  Private
const addItemPublic = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.private) {
    res.status(400);
    throw new Error("List not found");
  }

  list.items.splice(0, 0, req.body);

  if (!list.groups.some((e) => e.group === req.body.isle))
    list.groups.push({ group: req.body.isle });

  const updatedList = await List.findByIdAndUpdate(req.params.id, list, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// @desc    Update item
// @route   PUT /api/public/updateitem/:id
// @access  Private
const updateItemPublic = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.private) {
    res.status(400);
    throw new Error("List not found");
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
// @route   PUT /api/public/buyitem/:id
// @access  Private
const buyItemPublic = asyncHandler(async (req, res) => {
  if (!req.body.itemName) {
    res.status(400);
    throw new Error("Please add an item name");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.private) {
    res.status(400);
    throw new Error("List not found");
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

// @desc    Delete item public
// @route   PUT /api/public/deleteitem/:id
// @access  Private
const deleteItemPublic = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (list.private) {
    res.status(400);
    throw new Error("List not found");
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

module.exports = {
  getPublicList,
  addItemPublic,
  updateItemPublic,
  buyItemPublic,
  deleteItemPublic,
};
