import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsText/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var textupload = multer({ storage: storage, limits: { files: 5, fileSize: 1080* 2450 * 5} }).array("textimg");