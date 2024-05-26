const express = require("express");
const { protect, sellerOnly } = require("../middleware/authMiddleware");
const {
  postBuilding,
  editBuilding,
  deleteBuilding,
  getBuildings,
  getBuildingById,
  sellerInfo,
} = require("../controllers/buildingController");

const router = express.Router();

router.route("/").get(getBuildings).post(protect, sellerOnly, postBuilding);

router.route("/:id/info").get(sellerInfo);

router
  .route("/:id")
  .get(getBuildingById)
  .put(protect, sellerOnly, editBuilding)
  .delete(protect, sellerOnly, deleteBuilding);

module.exports = router;
