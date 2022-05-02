import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var videoupload = multer({ storage: storage, limits: { files: 10, fileSize: 1024* 1024 * 10} }).array("video");