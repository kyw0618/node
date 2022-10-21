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

export var textImg = multer({ storage: storage}).fields([{name:'textImg', maxCount : 5},
{name:'Img',maxCount: 5},{name:'video',maxCount: 3}]);