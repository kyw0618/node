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

// export var textImg = multer({ storage: storage}).array("textimg",5);
export var textImg = multer({ storage: storage}).fields([{name:'text1'},
{name: 'text2'}, {name: 'text3'},{name:'text4'},{name: 'text5'}],5);


