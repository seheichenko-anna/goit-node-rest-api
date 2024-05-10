import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,

  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 3,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(HttpError(400, ".exe files are not supported"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
