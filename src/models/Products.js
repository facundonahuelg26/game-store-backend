const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    imageLarge: String,
    category:String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Products", productsSchema);
