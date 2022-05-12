import multer from "multer";
import fs from "fs";

var storageTwo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var Img = multer({ storageTwo: storageTwo}).array("Img",5);