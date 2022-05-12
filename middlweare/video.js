import multer from "multer";
import fs from "fs";

var storageThird = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var video = multer({ storage: storageThird}).array("video",3);