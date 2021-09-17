const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    subscribed: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    logged: { type: Boolean, default: false },
    cart: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        name: { type: String, required: true },
        image_url: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: mongoose.Schema.Types.Decimal128, required: true },
      },
    ],
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
