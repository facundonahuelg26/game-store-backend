const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dataUserSchema = new Schema(
  {
    address: { type: String, required: true, trim: true, min: 3, max: 30 },
    height: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 6,
    },
    state: { type: String, required: true, trim: true, min: 3, max: 40 },
    city: { type: String, required: true, trim: true, min: 3, max: 40 },
    areacode: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    userData: { type: Schema.Types.ObjectId, ref: "User" },
    clientId: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("DataUser", dataUserSchema);
