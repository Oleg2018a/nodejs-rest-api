import HttpError from "../helpers/HttpError.js";
import { validateShemas } from "../middlewares/index.js";
import Contact from "../models/Contact.js";
import dotevn from "dotenv";
dotevn.config()
import {
  contactAddShemas,
  contactUpdateShemas,
  movieUpdateFavoriteSchema,
} from "../models/Contact.js";

export const getAll = async (req, res, next) => {
  
  try {
     const { _id: owner } = req.user;
    const result = await Contact.find({ owner }).populate(
      "owner",
      "email",
     
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};


export const getById = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
   const { _id: owner } = req.user;
    const result = await Contact.findOne({_id, owner})
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
    
    try {
      validateShemas(contactAddShemas, req.body)
      const { _id: owner } = req.user;
      const result = await Contact.create({...req.body, owner}); 
      res.status(201).json(result)
  } catch (error) {
    next(error)
  }
};
export const updateContact = async (req, res, next) => {
    try {
       validateShemas(contactUpdateShemas, req.body);

          const { id: _id } = req.params;
          const { _id: owner } = req.user;
        const result = await  Contact.findOneAndUpdate({_id,owner, ...req.body})
       if (!result) {
         throw HttpError(404);
       }
        res.json(result)
    } catch (error) {
        next(error)
    }
};
export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { error } = movieUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const deleteById = async (req, res, next) => {
    try {

          const { id: _id } = req.params;
          const { _id: owner } = req.user;
        const result = await Contact.findOneAndDelete({_id, owner})

         if (!result) {
           throw HttpError(404);
         }  
        res.json({
          message: "Contact deleted",
        });
    }  catch(error) {
        next(error)
    }
};