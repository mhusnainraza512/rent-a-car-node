const express = require('express');

const {
    getMakes,
    createMake,
    getMake,
    updateMake,
    deleteMake,
} = require('../controllers/makes');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(getMakes)
.post(protect, authorize('admin'), createMake);

router.route('/:id')
.get(getMake)
.put(protect, authorize('admin'), updateMake)
.delete(protect, authorize('admin'), deleteMake);

module.exports = router;