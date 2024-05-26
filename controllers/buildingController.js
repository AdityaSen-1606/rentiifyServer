const asyncHandler = require("express-async-handler");
const Building = require("../models/buildingModel");
const multer = require("multer");
const path = require("path");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array("images", 10); // Adjust the limit as needed

// @desc    Get all buildings
// @route   GET /api/buildings
// @access  Public
const getBuildings = asyncHandler(async (req, res) => {
  const buildings = await Building.find({});
  res.json(buildings);
});

// @desc    Get single building
// @route   GET /api/buildings/:id
// @access  Public
const getBuildingById = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (building) {
    res.json(building);
  } else {
    res.status(404);
    throw new Error("Building not found");
  }
});

const sellerInfo = asyncHandler (async (req,res)=>{
  const info = await Building.findById(req.params.id).populate('user','email');

  console.log("in Seller Info");

  if(info){
    res.json(info);
  } else {
    res.status(404);
    throw new Error ("Seller Info Not Found");
  }
})

// @desc    Post a new building
// @route   POST /api/buildings
// @access  Private (Seller only)
const postBuilding = asyncHandler((req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400);
      throw new Error("Error uploading files");
    }

    const { title, description, bedrooms, bathrooms, price, location } =
      req.body;
    const images = req.files.map((file) => file.path);

    const building = new Building({
      user: req.user._id,
      title,
      description,
      bedrooms,
      bathrooms,
      price,
      location,
      images,
    });

    const createdBuilding = await building.save();
    res.status(201).json(createdBuilding);
  });
});

// @desc    Edit a building
// @route   PUT /api/buildings/:id
// @access  Private (Seller only)
const editBuilding = asyncHandler((req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400);
      throw new Error("Error uploading files");
    }

    const { title, description, bedrooms, bathrooms, price, location } =
      req.body;
    const images = req.files.length
      ? req.files.map((file) => file.path)
      : req.body.images;

    const building = await Building.findById(req.params.id);

    if (building) {
      building.title = title;
      building.description = description;
      building.bedrooms = bedrooms;
      building.bathrooms = bathrooms;
      building.price = price;
      building.location = location;
      building.images = images;

      const updatedBuilding = await building.save();
      res.json(updatedBuilding);
    } else {
      res.status(404);
      throw new Error("Building not found");
    }
  });
});

// @desc    Delete a building
// @route   DELETE /api/buildings/:id
// @access  Private (Seller only)
const deleteBuilding = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (building) {
    await building.remove();
    res.json({ message: "Building removed" });
  } else {
    res.status(404);
    throw new Error("Building not found");
  }
});

module.exports = {
  getBuildings,
  getBuildingById,
  postBuilding,
  editBuilding,
  deleteBuilding,
  sellerInfo,
};
