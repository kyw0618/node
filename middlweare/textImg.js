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

export var textImg = multer({ storage: storage}).array("textimg",5);

var storageTwo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var Img = multer({ storage: storageTwo}).array("Img",5);

var storageThird = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

export var video = multer({ storage: storageThird}).array("video",3);
