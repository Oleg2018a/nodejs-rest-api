import express from 'express'

import { add, deleteById, getAll, getById, updatebyId } from '../../controllers/contact-controlers.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';


const contactsRouter = express.Router();

contactsRouter.get("/", getAll );
 
contactsRouter.get("/:id", getById );

contactsRouter.post("/", isEmptyBody, add);


contactsRouter.put("/:id", isEmptyBody, updatebyId);

contactsRouter.delete("/:id", deleteById );



export default contactsRouter 
