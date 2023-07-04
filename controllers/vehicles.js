const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Vehicle = require("../models/Vehicle");

// @desc Get all vehicles
// @route Get /api/v1/vehicles
// @access Private/Admin
exports.getVehicles = asyncHandler(async (req, res, next) => {
  const vehicles = await Vehicle.find().populate(['make_id', 'model_id', 'color_id']);
  
  res.status(200).json({
    success: true,
    count: vehicles.length,
    vehicles: vehicles,
  });
});

// @desc Create vehicle
// @route Post /api/v1/vehicles
// @access Private/Admin
exports.createVehicle = asyncHandler(async (req, res, next) => {
  // vehicle sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this vehicle`,
        401
      )
    );
  }

  const vehicle = await Vehicle.create(req.body);

  res.status(201).json({
    success: true,
    data: vehicle,
  });
});

// @desc Get single vehicle
// @route Get /api/v1/vehicles/:id
// @access Private/Admin
exports.getVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: vehicle,
  });
});

// @desc Update vehicle
// @route PUT /api/v1/vehicles/:id
// @access Private/Admin
exports.updateVehicle = asyncHandler(async (req, res, next) => {
  let vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 400)
    );
  }

  // vehicle sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this vehicle`,
        401
      )
    );
  }

  vehicle = await Vehicle.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: vehicle,
  });
});

// @desc Delete vehicle
// @route DELETE /api/v1/vehicles/:id
// @access Private/Admin
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 400)
    );
  }

  // vehicle sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this vehicle`,
        401
      )
    );
  }

  await vehicle.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
