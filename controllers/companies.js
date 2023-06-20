const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Company = require('../models/Company');

// @desc Get all companies
// @route Get /api/v1/companies
// @access Private/Admin
exports.getCompanies = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc Create company
// @route Post /api/v1/companies
// @access Private/Admin
exports.createCompany = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    req.body.user = user.id;
    
    // make sure user is bootcamp owner
    if(req.user.role != 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to create this company`, 401));
    }

    const company = await Company.create(req.body);
    
    res.status(201).json({
        success: true,
        data: company
    })
});

// @desc Get single company
// @route Get /api/v1/companies/:id
// @access Private/Admin
exports.getCompany = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);

    if(!company){
        return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        data: company
    })
});

// @desc Update company
// @route PUT /api/v1/companies/:id
// @access Private/Admin
exports.updateCompany = asyncHandler(async (req, res, next) => {
    let company  = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 400));
    }

    // make sure user is bootcamp owner
    if(req.user.role != 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this company`, 401));
    }

    company = await Company.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: company
    });
});


// @desc Delete company
// @route DELETE /api/v1/companies/:id
// @access Private/Admin
exports.deleteCompany = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 400));
    }

    // make sure user is bootcamp owner
    if(req.user.role != 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this company`, 401));
    }

    await company.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc Update company
// @route PUT /api/v1/companies/:id/status
// @access Private/Admin
exports.updateStatus = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorResponse(`Company not found with id of ${req.params.id}`, 400));
    }

    // make sure user is bootcamp owner
    if(req.user.role != 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this company`, 401));
    }

    var id = { _id: req.params.id }

    const update = {
        $unset: { uniqueField: 1 }, // Remove the unique field
        $set: { otherField: req.body } // Set other fields to be updated
      };

    company = await User.findOneAndUpdate(id, update, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: company
    });
});