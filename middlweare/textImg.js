import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "TextUploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var textImg = multer({ storage: storage}).array("textimg", 5);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var Img = multer({ storage: storage}).array("Img", 5);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var video = multer({ storage: storage}).array("video",3);
