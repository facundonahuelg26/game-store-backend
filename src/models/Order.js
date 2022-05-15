const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    items: [],
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    height: {
      type: String,
      required: true,
      trim: true,
    },
    client: { type: String, required: true, trim: true },
    shippingPrice: { type: Number, required: true, trim: true },
    paymentId: { type: String, required: true, trim: true },
    paymentStatus: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Order", orderSchema);
