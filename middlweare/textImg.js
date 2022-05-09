import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({

  destination:function (req, file, cb) {
    cb(null, "uploadsText/");
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
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