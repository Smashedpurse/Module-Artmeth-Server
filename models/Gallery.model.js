
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const gallerySchema = new Schema(
  {
    galleryname: String,
    description: String,
    Pic: String,
    user:{type: ObjectId, ref: "User"}
  },
  {
    timestamps: true
  }
);

module.exports = model("Gallery", gallerySchema);
