import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: String,
  streetAddress: String,
  city: String,
  phone: String,
  zip: String,
  email: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const userModel = mongoose.model("userCollection", userSchema);

export default userModel;
