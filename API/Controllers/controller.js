import bcrypt from "bcrypt";
import { userSchema } from "../Schema/schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", userSchema);

const initiateUser = async (req, res, next) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    let result = await user.save();
    if (result) {
      res.status(201).json({
        message: "User created!",
        result: result,
      });
    }
  } catch (err) {
    console.log(`Not able to create the user:${err}`);
    res.status(500).json({
      message: "Invalid authentication credentials!",
    });
  }
};

const loginUser = async (req, res, next) => {
  let fetchedUser;
  try {
    fetchedUser = await User.find({ email: req.body.email });
    if (!fetchedUser) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    console.log("fetchedUser=>", fetchedUser);
    let result = await bcrypt.compare(
      req.body.password,
      fetchedUser[0].password
    );
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    let token = jwt.sign(
      { email: fetchedUser[0].email, userId: fetchedUser[0]._id },
      "secretKey",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser[0]._id,
      theme: fetchedUser[0].theme,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid authentication credentials!",
    });
  }
};

const setTheme = (req, res, next) => {
  
};

const getProfile = (req, res, next) => {
    
};

export default { initiateUser, loginUser, setTheme, getProfile };
