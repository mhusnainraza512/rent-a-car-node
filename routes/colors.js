const express = require('express');

const {
    getColors,
    createColor,
    getColor,
    updateColor,
    deleteColor,
} = require('../controllers/colors');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(getColors)
.post(protect, authorize('admin'), createColor);

router.route('/:id')
.get(getColor)
.put(protect, authorize('admin'), updateColor)
.delete(protect, authorize('admin'), deleteColor);

module.exports = router;