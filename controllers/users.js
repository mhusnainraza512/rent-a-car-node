const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User.js");
const UserDetail = require("../models/UserDetail.js");
const Vehicle = require("../models/Vehicle.js");
const mongoose = require("mongoose");
const { Types } = mongoose;

// @desc Get all users
// @route Get /api/v1/auth/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: req.body.role }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc Get single users
// @route Get /api/v1/auth/users/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  if (
    req.params.id == "employee" ||
    req.params.id == "customer" ||
    req.params.id == "company"
  ) {
    var users = await User.find({ role: req.params.id });

    if (req.params.id == "employee" || req.params.id == "customer") {
      var users = await Promise.all(
        users.map(async function (user) {
          let userDetail = await UserDetail.findOne({ user: user.id });
          return { ...user._doc, userDetail: userDetail };
        })
      );
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } else {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 400)
      );
    }

    const userDetail = await UserDetail.findOne({ user: user.id });

    user.userDetail = userDetail || {};

    res.status(200).json({
      success: true,
      data: user,
    });
  }
});

// @desc Create user
// @route Post /api/v1/auth/users
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  req.body.name = req.body.name_en;
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc Update user
// @route PUT /api/v1/auth/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 400)
    );
  }

  user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (
    user.role == undefined ||
    user.role == "employee" ||
    user.role == "customer"
  ) {
    var userDetail = await UserDetail.findOneAndUpdate(
      { user: req.params.id },
      req.body.userDetail,
      {
        new: true,
        runValidators: true,
      }
    );
    user.userDetail = userDetail;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Delete user
// @route DELETE /api/v1/auth/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);


  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 400)
    );
  }

  const vehicles = await Vehicle.find({user: req.params.id});

  if (vehicles.length > 0) {
    return next(
      new ErrorResponse(`You are not able to delete this user because this user is using in vehicle model`, 400)
    );
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc Update user status
// @route PUT /api/v1/users/:id/status
// @access Private/Admin
exports.updateStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 400));
  }

  // make sure user is bootcamp owner
  if(req.user.role != 'admin'){
      return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this user`, 401));
  }

  var id = { _id: req.params.id }

  user = await User.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true
  });

  res.status(200).json({
      success: true,
      data: company
  });
});