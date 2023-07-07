const express = require("express");

const {
  getVehicles,
  createVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclesAvailability,
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

  router
  .route("/availability/list")
  .get(getVehiclesAvailability)

module.exports = router;
