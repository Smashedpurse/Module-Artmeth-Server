
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gallerySchema = new Schema(
  {
    galleryname: String,
    description: String,
    Pic: String
  },
  {
    timestamps: true
  }
);

module.exports = model("Gallery", gallerySchema);
