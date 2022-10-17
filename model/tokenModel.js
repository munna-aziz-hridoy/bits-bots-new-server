import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const tokenModel = mongoose.model("refreshTokenCollection", tokenSchema);

export default tokenModel;
