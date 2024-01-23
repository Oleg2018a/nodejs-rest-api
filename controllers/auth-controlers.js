import fs from "fs/promises";
import path from "path";
import HttpError from "../helpers/HttpError.js";
import { validateShemas } from "../middlewares/index.js";
import User, { userSignInShema } from "../models/User.js";
import { userSignUpShema } from "../models/User.js";
import jwt from "jsonwebtoken";

import gravatar from "gravatar";
import dotevn from "dotenv";
import bcrypt from "bcrypt";
dotevn.config();

const { JWT_SECRET } = process.env;

const avatarDir = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
  try {
    validateShemas(userSignUpShema, req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarUrl,
    });

    res.json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    validateShemas(userSignInShema, req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;
    const payload = {
      id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(req.body)
    console.log(req.file)
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`
    const result = path.join(avatarDir, filename);
    await fs.rename(tempUpload, result);


    const avatarUrl = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json({
      avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};
