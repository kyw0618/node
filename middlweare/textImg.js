import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "TextUploads/");
  },

  filename(req, file, callback) {
     let array = file.originalname.split('.'); 
      array[0] = array[0] + '_';
      array[5] = '.' + array[5]; 
      array.splice(5, 0, Date.now().toString()); 
      const result = array.join(''); 
      console.log(result); callback(null, result); 
    },

 });

export var textImg = multer({ storage: storage}).array("textimg",5);


