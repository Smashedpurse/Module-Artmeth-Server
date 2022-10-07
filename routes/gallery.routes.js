// routes/movies.routes.js
 const { response } = require("express");
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


//Read
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
 

router.get ("/gallery/user-detail/:id", (req,res,next) =>{
  const {id} = req.params

  UserModel.findById(id)
  .populate("galleries")
  .then( response => res.json(response))
  .catch(error => console.log(error))

})

//Create
// POST '/api/movies' => for saving a new gallery in the database
router.post('/gallery/:id', (req, res, next) => {
  const {id} = req.params
     
  GalleryModel.create(req.body)
    .then(galleryCreated => {
      UserModel.findByIdAndUpdate(id,{ $push: { galleries: galleryCreated._id }},{new:true})
      .then(response => console.log(response))
      res.status(200).json(galleryCreated);
    })
    .catch(err => next(err));
});



//Update
//
router.put("/gallery/update/:id", async (req,res) =>{
  try{ 
    const {id} = req.params
      const GalleryUpdated = await GalleryModel.findByIdAndUpdate(id, req.body, {new:true});    
      res.json(GalleryUpdated);
  }catch(error){
    console.log(error)
  }
})


//Delete
//
router.delete("/gallery/delete/:id", async(req,res) =>{
  try{
    const {id} = req.params;
    const GalleryRemoved = await GalleryModel.findByIdAndDelete(id)
    res.json(GalleryRemoved)
  }catch(error){
    console.log(error)
  }
})

 
module.exports = router;