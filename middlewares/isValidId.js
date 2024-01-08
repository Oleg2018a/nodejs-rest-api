

import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
    const { id } = req.params
    console.log(id)
    
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} not is valid `));
    }
    next();
}
    export default isValidId