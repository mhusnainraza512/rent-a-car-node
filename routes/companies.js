const express = require('express');

const {
    getCompanies,
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
} = require('../controllers/companies');

const Company = require('../models/Company');

const router = express.Router({mergeParams: true});

const advancedResults =  require('../middleware/advancedResults')
const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(advancedResults(Company), getCompanies)
.post(protect, authorize('admin'), createCompany);

router.route('/:id')
.get(getCompany)
.put(protect, authorize('admin'), updateCompany)
.delete(protect, authorize('admin'), deleteCompany);

module.exports = router;