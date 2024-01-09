import { HttpError } from "../helpers/index.js";

const validateShemas = (shemas, data) => {
     const { error } = shemas.validate(data);
     if (error) {
       throw HttpError(400, error.message);
     }
}
export default validateShemas