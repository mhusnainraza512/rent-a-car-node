const express = require('express');

const {
    getModels,
    createModel,
    getModelsByMake,
    getModel,
    updateModel,
    deleteModel,
} = require('../controllers/models');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(getModels)
.post(protect, authorize('admin'), createModel);


router.route('/make/:id')
.get(getModelsByMake);

router.route('/:id')
.get(getModel)
.put(protect, authorize('admin'), updateModel)
.delete(protect, authorize('admin'), deleteModel);


module.exports = router;