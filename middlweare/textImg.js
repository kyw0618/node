import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsText/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now + '-' + file.originalname);
  },
 });

export var textImg = multer({ storage: storage}).array("textimg",5);