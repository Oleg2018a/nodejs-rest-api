// import Jimp from "jimp";
// import { HttpError } from "../helpers/index.js";


// const jimp = async (req, res, next) => {
//   try {
//       const { path } = req.file;
//       console.log(path)
//     const image = await Jimp.read(path);
//     await image.resize(250, 250).writeAsync(path);
//     next();
//   } catch (err) {
//     next(HttpError(400));
//   }
// };

// export default jimp

import Jimp from "jimp";
import { HttpError } from "../helpers/index.js";

const jimp = async (req, res, next) => {
  try {
    const { path } = req.file;
    const image = await Jimp.read(path);
    await image.resize(250, 250).writeAsync(path);
    next();
  } catch (err) {
    next(HttpError(400));
  }
};

export default jimp;
