import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "textimgs/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var textupload = multer({ storage: storage, limits: { files: 10, fileSize: 1024* 1024 * 10} }).array("textimg");