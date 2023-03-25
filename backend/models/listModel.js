const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    owner: {
      type: String,
    },
    listName: {
      type: String,
      required: [true, "Please add a list name"],
    },
    showBought: {
      type: Boolean,
      default: false,
    },
    private: {
      type: Boolean,
      default: true,
    },
    sharedWith: [
      {
        email: {
          type: String,
          required: [true, "Email is required"],
        },
      },
    ],
    items: [
      {
        itemName: {
          type: String,
          required: [true, "Please add an item name"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        isBought: {
          type: Boolean,
          default: false,
        },
        isle: {
          type: String,
          default: "",
        },
      },
    ],
    groups: [
      {
        group: {
          type: String,
          default: "",
        },
        isSelected: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
