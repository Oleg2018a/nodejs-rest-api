import express from "express";

import { upload, authenticate, isEmptyBody, jimp  } from "../../middlewares/index.js";
import { updateAvatar,getCurrent, login, logout, register } from "../../controllers/auth-controlers.js";

const authRouter = express.Router()

authRouter.post("/register", isEmptyBody, register);

authRouter.post("/login", isEmptyBody, login);

authRouter.get("/current", authenticate, getCurrent)

authRouter.post("/logout", authenticate, logout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"),jimp, updateAvatar );



export default authRouter