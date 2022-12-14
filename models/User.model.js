const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    userName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email:{
    type: String,
  },
    password:{
    type:String
  },
  galleries:[{ type: ObjectId, ref: "Gallery" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
