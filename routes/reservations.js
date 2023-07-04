const express = require("express");

const {
  getReservations,
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/Reservations");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getReservations)
  .post(protect, authorize("admin"), createReservation);

router
  .route("/:id")
  .get(getReservation)
  .put(protect, authorize("admin"), updateReservation)
  .delete(protect, authorize("admin"), deleteReservation);

module.exports = router;
