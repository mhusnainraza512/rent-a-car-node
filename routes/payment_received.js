const express = require('express');

const {
    getPaymentReceiveds,
    createPaymentReceived,
    getPaymentReceived,
    updatePaymentReceived,
    deletePaymentReceived,
} = require('../controllers/payment_received');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(getPaymentReceiveds)
.post(protect, authorize('admin'), createPaymentReceived);

router.route('/:id')
.get(getPaymentReceived)
.put(protect, authorize('admin'), updatePaymentReceived)
.delete(protect, authorize('admin'), deletePaymentReceived);

module.exports = router;