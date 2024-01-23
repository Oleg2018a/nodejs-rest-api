import express from "express";

import {
  add,
  deleteById,
  getAll,
  getById,
  updateFavoriteContact,
  updateContact,
} from "../../controllers/contact-controlers.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", isValidId, getById);

contactsRouter.post("/",  isEmptyBody, add);

contactsRouter.put("/:id", isValidId, isEmptyBody, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  updateFavoriteContact
);

contactsRouter.delete("/:id", isValidId, deleteById);

export default contactsRouter;
