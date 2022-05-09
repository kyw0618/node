import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsText/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
 });

 const fileFilter = function(req, file, cb){
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null, true);
  }else{
      cb(null, false);
  }
}

export const textupload = multer({ storage: storage, fileFilter: fileFilter}).array("textimg");