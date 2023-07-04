const express = require("express");

const {
  getVehicles,
  createVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicles");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getVehicles)
  .post(protect, authorize("admin"), createVehicle);

router
  .route("/:id")
  .get(getVehicle)
  .put(protect, authorize("admin"), updateVehicle)
  .delete(protect, authorize("admin"), deleteVehicle);

module.exports = router;
