var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "profileImg/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
   });
  
  export var upload = multer({ storage: storage }).single("profile");