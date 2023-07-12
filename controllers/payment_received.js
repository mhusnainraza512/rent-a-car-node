const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const PaymentReceived = require("../models/PaymentReceived");

// @desc Get all payment_receiveds
// @route Get /api/v1/payment-receiveds
// @access Private/Admin
exports.getPaymentReceiveds = asyncHandler(async (req, res, next) => {
  const payment_receiveds = await PaymentReceived.find().sort({
    createdAt: -1,
  });
  
  res.status(200).json({
    success: true,
    count: payment_receiveds.length,
    payment_receiveds: payment_receiveds,
  });
});

// @desc Create make
// @route Post /api/v1/payment_receiveds
// @access Private/Admin
exports.createPaymentReceived = asyncHandler(async (req, res, next) => {
  // make sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this make`,
        401
      )
    );
  }

  const make = await PaymentReceived.create(req.body);

  res.status(201).json({
    success: true,
    data: make,
  });
});

// @desc Get single make
// @route Get /api/v1/payment_receiveds/:id
// @access Private/Admin
exports.getPaymentReceived = asyncHandler(async (req, res, next) => {
  const make = await PaymentReceived.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`PaymentReceived not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Update make
// @route PUT /api/v1/payment_receiveds/:id
// @access Private/Admin
exports.updatePaymentReceived = asyncHandler(async (req, res, next) => {
  let make = await PaymentReceived.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`PaymentReceived not found with id of ${req.params.id}`, 400)
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

  make = await PaymentReceived.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Delete make
// @route DELETE /api/v1/payment_receiveds/:id
// @access Private/Admin
exports.deletePaymentReceived = asyncHandler(async (req, res, next) => {
  const make = await PaymentReceived.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`PaymentReceived not found with id of ${req.params.id}`, 400)
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
