import { Schema, model, version } from "mongoose";
import Joi from "joi";
import { addUpdateSettings, handleSaveError } from "./hooks.js";


const userShemas = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
}, { versionKey: false, timestamps: true }); 


userShemas.post("save", handleSaveError);

userShemas.pre("findOneAndUpdate", addUpdateSettings);

userShemas.post("findOneAndUpdate", handleSaveError);

export const userSignUpShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userSignInShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const User = model("user", userShemas)

export default User