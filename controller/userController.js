import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import userModel from "../model/userModel.js";
import tokenModel from "../model/tokenModel.js";
import genarateToken from "../utils/genarateToken.js";

export const registerNewUserController = async (req, res) => {
  const { userName, email, city, phone, streetAddress, zipCode } = req.body;

  if (!email)
    return res.status(401).send({ message: "must have a email to register" });

  // ******
  try {
    const exists = await userModel.findOne({ email });

    // check user exists
    if (exists) return res.status(404).send({ message: "user already exists" });

    // gen salt and hashed password

    // create and save user

    const newUser = new userModel({
      userName,
      streetAddress,
      city,
      phone,
      zip: zipCode,
      email,
    });
    await newUser.save();

    // create access and refresh token

    // const { accessToken, refreshToken } = await genarateToken(email);

    // send response

    res.status(201).send({
      message: "successfully created a new user",

      email: newUser.email,
    });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

export const createUserController = async (req, res) => {
  const { userName, email, city, phone, streetAddress, zipCode } = req.body;

  try {
    // check user exists
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(404).send({ message: "user already exists" });

    const newUser = new userModel({
      userName,
      email,
      city,
      phone,
      streetAddress,
      zip: zipCode,
    });

    await newUser.save();

    res.status(201).send({
      message: "created user successfully",

      user: newUser,
    });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// check user is logged in

export const checkUserController = async (req, res) => {
  const email = req.decoded.email;

  try {
    const exists = await userModel.findOne({ email });

    if (!exists) {
      return res.status(401).send({ message: "user not found" });
    }
    return res
      .status(201)
      .send({ success: true, message: "User found", user: email });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// update user information

export const updateUserController = async (req, res) => {
  const {
    firstName,
    lastName,
    zipCode,
    phone,
    streetAddress,
    password,
    email,
    city,
  } = req.body;

  try {
    // check user exists
    const exists = await userModel.findOne({ email });

    if (!exists) return res.status(404).send({ message: "user not exists" });

    const updatedDoc = {
      $set: {
        userName: `${firstName} ${lastName}`,
        zip: zipCode,
        phone,
        streetAddress,
        city,
      },
    };
    const response = await userModel.updateOne({ email }, updatedDoc);
    res.status(201).send({ success: true, ...response });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};
