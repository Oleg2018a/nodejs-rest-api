import HttpError from "../helpers/HttpError.js";
import Contact from "../models/Contact.js";

import {
  contactAddShemas,
  contactUpdateShemas,
  movieUpdateFavoriteSchema,
} from "../models/Contact.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find()

    res.json(result);
  } catch (error) {
    next(error);
  }
};


export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await Contact.findById(id)
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
        const { error } = contactAddShemas.validate(req.body)
        if (error) {
          throw HttpError(400, error.message);
        }

      const result = await Contact.create(req.body); 
      res.status(201).json(result)
  } catch (error) {
    next(error)
  }
};
export const updatebyId = async (req, res, next) => {
    try {
        const { error } = contactUpdateShemas.validate(req.body)
         if (error) {
           throw HttpError(400, error.message);
        }

        const { id } = req.params
        const result = await  Contact.findByIdAndUpdate(id, req.body)
       if (!result) {
         throw HttpError(404);
       }
        res.json(result)
    } catch (error) {
        next(error)
    }
};
export const updateOnlyById = async (req, res, next) => {
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
        const { id } = req.params
        const result = await Contact.findByIdAndDelete(id)

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