const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Model = require("../models/Model");

// @desc Get all models
// @route Get /api/v1/models
// @access Private/Admin
exports.getModels = asyncHandler(async (req, res, next) => {
  const models = await Model.find().populate("make_id");
  
  res.status(200).json({
    success: true,
    count: models.length,
    models: models,
  });
});

// @desc Create model
// @route Post /api/v1/models
// @access Private/Admin
exports.createModel = asyncHandler(async (req, res, next) => {
  // model sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this model`,
        401
      )
    );
  }

  const model = await Model.create(req.body);

  res.status(201).json({
    success: true,
    data: model,
  });
});

// @desc Get single model
// @route Get /api/v1/models/:id
// @access Private/Admin
exports.getModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: model,
  });
});

// @desc Get models by make
// @route Get /api/v1/models/:id/make
// @access Private/Admin
exports.getModelsByMake = asyncHandler(async (req, res, next) => {
  const models = await Model.find({make_id: req.params.id});

  if (!models) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    count: models.length,
    data: models,
  });
});

// @desc Update model
// @route PUT /api/v1/models/:id
// @access Private/Admin
exports.updateModel = asyncHandler(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 400)
    );
  }

  // model sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this model`,
        401
      )
    );
  }

  model = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: model,
  });
});

// @desc Delete model
// @route DELETE /api/v1/models/:id
// @access Private/Admin
exports.deleteModel = asyncHandler(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(
      new ErrorResponse(`Model not found with id of ${req.params.id}`, 400)
    );
  }

  // model sure user is bootcamp owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this model`,
        401
      )
    );
  }

  await model.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
