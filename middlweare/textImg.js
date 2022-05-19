import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "TextUploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
    // let array = file.originalname.split('.');
    // array[0] = array[0] + '_';
  },
 });

export var textImg = multer({ storage: storage}).array("textimg",5);


