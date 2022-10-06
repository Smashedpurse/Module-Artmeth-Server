// routes/movies.routes.js
 
const express = require("express");
const router = express.Router();
 
// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");
const GalleryModel = require("../models/Gallery.model");
const UserModel = require("../models/User.model");
 
 
// GET "/api/gallery" => Route to list all available gallery
router.get("/gallery", (req, res, next) => {
  GalleryModel.find()
    .then(dataFromDB => res.status(200).json(dataFromDB))
    .catch(err => next(err));
});

router.get("/gallery/details/:id", (req, res, next) => {
  GalleryModel.findById(req.params.id)
    .then(dataFromDB => res.status(200).json(dataFromDB))
    .catch(err => next(err));
});

 
// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});
 
// POST '/api/movies' => for saving a new movie in the database
router.post('/gallery/:id', (req, res, next) => {
  const {id} = req.params
    
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method
 
  GalleryModel.create(req.body)
    .then(galleryCreated => {
      UserModel.findByIdAndUpdate(id,{ $push: { galleries: galleryCreated._id }},{new:true})
      .then(response => console.log(response))
      res.status(200).json(galleryCreated);
    })
    .catch(err => next(err));
});
 
module.exports = router;