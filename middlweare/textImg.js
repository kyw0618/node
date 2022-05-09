import multer from "multer";
import fs from "fs";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsText/");
  },
  filename: (req, file, cb) => {
    cb(null, `${path.now()}_${file.originalname}`);
  },
 });

export var textupload = multer({ storage: storage}).array("textimg");