import jwt from "jsonwebtoken";
import tokenModel from "../model/tokenModel.js";

const verifyUserAuthToken = async (req, res, next) => {
  const accessTokenBearer = req.headers["Authorization"];

  const refreshToken = req.body.refreshToken;

  if (!accessTokenBearer && !refreshToken)
    return res.status(401).send({ message: "unauthorized user" });

  const accessToken = accessTokenBearer?.split(" ")[1];

  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.status(401).send({ message: "unauthorized user" });
      req.decoded = decoded;
      next();
      return;
    });
  }
  if (!accessToken && refreshToken) {
    const exists = await tokenModel.findOne({ token: refreshToken });
    if (!exists) return res.status(401).send({ message: "unauthorized user" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.status(401).send({ message: "unauthorized user" });
      req.decoded = decoded;

      res.newAccessToken = jwt.sign(
        { email: req.body.email },
        process.env.ACCESS_TOKEN
      );
      next();

      return;
    });
  }
};

export default verifyUserAuthToken;
