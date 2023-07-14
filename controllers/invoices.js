const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Invoice = require("../models/Invoice");
const Wallet = require("../models/Wallet");
const Reservation = require("../models/Reservation");

// @desc Get all invoices
// @route Get /api/v1/invoices
// @access Private/Admin
exports.getInvoices = asyncHandler(async (req, res, next) => {
  const invoices = await Invoice.find().sort({
    createdAt: -1,
  });
  
  res.status(200).json({
    success: true,
    count: invoices.length,
    invoices: invoices,
  });
});

// @desc Create make
// @route Post /api/v1/invoices
// @access Private/Admin
exports.createInvoice = asyncHandler(async (req, res, next) => {
  // make sure user is admin
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to create this make`,
        401
      )
    );
  }

  const invoice = await Invoice.create(req.body);

  let reservation = await Reservation.findOne({_id: req.body.reservation_id});

  if(reservation){
    req.body.reservation_amount = req.body.remaining_amount;
    await Reservation.findOneAndUpdate({_id: req.body.reservation_id}, req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(201).json({
    success: true,
    data: invoice,
  });
});

// @desc Get single make
// @route Get /api/v1/invoices/:id
// @access Private/Admin
exports.getInvoice = asyncHandler(async (req, res, next) => {
  const make = await Invoice.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Update make
// @route PUT /api/v1/invoices/:id
// @access Private/Admin
exports.updateInvoice = asyncHandler(async (req, res, next) => {
  let make = await Invoice.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 400)
    );
  }

  // make sure user is invoice owner
  if (req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this make`,
        401
      )
    );
  }

  make = await Invoice.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: make,
  });
});

// @desc Delete make
// @route DELETE /api/v1/invoices/:id
// @access Private/Admin
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
  const make = await Invoice.findById(req.params.id);

  if (!make) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 400)
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
