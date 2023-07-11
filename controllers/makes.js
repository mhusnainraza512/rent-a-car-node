const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Make = require("../models/Make");
const Vehicle = require("../models/Vehicle.js");

// @desc Get all makes
// @route Get /api/v1/makes
// @access Private/Admin
exports.getMakes = asyncHandler(async (req, res, next) => {
  const makes = await Make.find();
  
  res.status(200).json({
    success: true,
    count: makes.length,
    makes: makes,
  });
});

// @desc Create make
// @route Post /api/v1/makes
// @access Private/Admin
exports.createMake = asyncHandler(async (req, res, next) => {
  // make sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this make`,
        401
      )
    );
  }

  const make = await Make.create(req.body);

  res.status(201).json({
    success: true,
    data: make,
  });
});

// @desc Get single make
// @route Get /api/v1/makes/:id
// @access Private/Admin
exports.getMake = asyncHandler(async (req, res, next) => {
  const make = await Make.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Make not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Update make
// @route PUT /api/v1/makes/:id
// @access Private/Admin
exports.updateMake = asyncHandler(async (req, res, next) => {
  let make = await Make.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Make not found with id of ${req.params.id}`, 400)
    );
  }

  // make sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this make`,
        401
      )
    );
  }

  make = await Make.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Delete make
// @route DELETE /api/v1/makes/:id
// @access Private/Admin
exports.deleteMake = asyncHandler(async (req, res, next) => {
  const make = await Make.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Make not found with id of ${req.params.id}`, 400)
    );
  }

  // make sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this make`,
        401
      )
    );
  }

  const vehicles = await Vehicle.find({make_id: req.params.id});

  if (vehicles.length > 0) {
    return next(
      new ErrorResponse(`You are not able to delete this make because this make is using in vehicle model`, 400)
    );
  }

  await make.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
