import HttpError from "../helpers/HttpError.js";
import { addContacts, getContactById, listContacts, removeContactById, updateContactById } from "../models/index.js";
import { contactAddShemas, contactUpdateShemas } from "../shemas/contact-shemas.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
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

      const result = await addContacts(req.body); 
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
        const result = await updateContactById(id, req.body)
       if (!result) {
         throw HttpError(404);
       }
        res.json(result)
    } catch (error) {
        next(error)
    }
};
export const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await removeContactById(id)

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