import express from 'express'

import {
  add,
  deleteById,
  getAll,
  getById,
  updateOnlyById,
  updatebyId,
} from "../../controllers/contact-controlers.js";

import {isEmptyBody, isValidId,} from "../../middlewares/index.js"

const contactsRouter = express.Router();

contactsRouter.get("/", getAll );
 
contactsRouter.get("/:id", isValidId, getById);

contactsRouter.post("/", isEmptyBody, add);

contactsRouter.put("/:id", isValidId, isEmptyBody, updatebyId);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, updateOnlyById);

contactsRouter.delete("/:id",isValidId, deleteById );



export default contactsRouter 
