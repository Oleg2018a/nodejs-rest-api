import express from "express";

import { authenticate, isEmptyBody, isValidId } from "../../middlewares/index.js";
import { getCurrent, login, logout, register } from "../../controllers/auth-controlers.js";

const authRouter = express.Router()

authRouter.post("/register", isEmptyBody, register);

authRouter.post("/login", isEmptyBody, login);

authRouter.get("/current", authenticate, getCurrent)

authRouter.post("/logout", authenticate, logout);



export default authRouter