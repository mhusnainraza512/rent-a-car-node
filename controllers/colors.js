const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Color = require("../models/Color");

// @desc Get all colors
// @route Get /api/v1/colors
// @access Private/Admin
exports.getColors = asyncHandler(async (req, res, next) => {
  const colors = await Color.find();
  
  res.status(200).json({
    success: true,
    count: colors.length,
    colors: colors,
  });
});

// @desc Create color
// @route Post /api/v1/colors
// @access Private/Admin
exports.createColor = asyncHandler(async (req, res, next) => {
  // color sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this color`,
        401
      )
    );
  }

  const color = await Color.create(req.body);

  res.status(201).json({
    success: true,
    data: color,
  });
});

// @desc Get single color
// @route Get /api/v1/colors/:id
// @access Private/Admin
exports.getColor = asyncHandler(async (req, res, next) => {
  const color = await Color.findById(req.params.id);

  if (!color) {
    return next(
      new ErrorResponse(`Color not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: color,
  });
});

// @desc Update color
// @route PUT /api/v1/colors/:id
// @access Private/Admin
exports.updateColor = asyncHandler(async (req, res, next) => {
  let color = await Color.findById(req.params.id);

  if (!color) {
    return next(
      new ErrorResponse(`Color not found with id of ${req.params.id}`, 400)
    );
  }

  // color sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this color`,
        401
      )
    );
  }

  color = await Color.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: color,
  });
});

// @desc Delete color
// @route DELETE /api/v1/colors/:id
// @access Private/Admin
exports.deleteColor = asyncHandler(async (req, res, next) => {
  const color = await Color.findById(req.params.id);

  if (!color) {
    return next(
      new ErrorResponse(`Color not found with id of ${req.params.id}`, 400)
    );
  }

  // color sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this color`,
        401
      )
    );
  }

  await color.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
