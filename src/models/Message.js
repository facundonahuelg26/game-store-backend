const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      min: 17,
      max: 255,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Products" },
    userType:{type: String,trim:true},
    admin:{type: String,trim:true},
    response:{type: String,trim:true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Message", messageSchema);
