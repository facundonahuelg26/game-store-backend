const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcryptjs = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, min: 3, max: 20 },
    lastname: { type: String, required: true, trim: true, min: 3, max: 20 },
    email: {
      type: String,
      required: true,
      unique:true,
      trim: true,
      min: 11,
      max: 255,
    },
    password: { type: String, required: true, min: 6, max: 1024, trim: true },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10)
  return await bcryptjs.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcryptjs.compare(password, receivedPassword)
}

module.exports = model("User", userSchema);
