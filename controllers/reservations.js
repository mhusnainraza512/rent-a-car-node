const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Reservation = require("../models/Reservation");

// @desc Get all reservations
// @route Get /api/v1/reservations
// @access Private/Admin
exports.getReservations = asyncHandler(async (req, res, next) => {
  let reservations;
  const status = req.query.status;
  let today = req.query.today;
  if (status) {
    reservations = await Reservation.find({ reservation_status: status }).sort({
      createdAt: -1,
    });
  } else if (today) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    reservations = await Reservation.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: -1 });
  } else {
    reservations = await Reservation.find().sort({ createdAt: -1 });
  }

  res.status(200).json({
    success: true,
    count: reservations.length,
    reservations: reservations,
  });
});

// @desc Create reservation
// @route Post /api/v1/reservations
// @access Private/Admin
exports.createReservation = asyncHandler(async (req, res, next) => {
  // reservation sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this reservation`,
        401
      )
    );
  }

  const reservation = await Reservation.create(req.body);

  res.status(201).json({
    success: true,
    data: reservation,
  });
});

// @desc Get single reservation
// @route Get /api/v1/reservations/:id
// @access Private/Admin
exports.getReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    return next(
      new ErrorResponse(
        `Reservation not found with id of ${req.params.id}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    data: reservation,
  });
});

// @desc Update reservation
// @route PUT /api/v1/reservations/:id
// @access Private/Admin
exports.updateReservation = asyncHandler(async (req, res, next) => {
  let reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    return next(
      new ErrorResponse(
        `Reservation not found with id of ${req.params.id}`,
        400
      )
    );
  }

  // reservation sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this reservation`,
        401
      )
    );
  }

  reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: reservation,
  });
});

// @desc Delete reservation
// @route DELETE /api/v1/reservations/:id
// @access Private/Admin
exports.deleteReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    return next(
      new ErrorResponse(
        `Reservation not found with id of ${req.params.id}`,
        400
      )
    );
  }

  // reservation sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this reservation`,
        401
      )
    );
  }

  await reservation.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
