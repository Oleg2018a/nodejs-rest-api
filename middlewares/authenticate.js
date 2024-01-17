import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import { HttpError } from "../helpers/index.js";
import User from "../models/User.js";

dotevn.config();
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(HttpError(401));
    }
    req.user = user
    next();
  } catch (error) {

    next(HttpError(401, error.message));
  }
};

export default authenticate;
