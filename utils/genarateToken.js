import jwt from "jsonwebtoken";
import tokenModel from "../model/tokenModel.js";

const genarateToken = async (email) => {
  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN);
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN);
  const newToken = new tokenModel({ token: refreshToken });
  await newToken.save();

  return { accessToken, refreshToken };
};

export default genarateToken;
