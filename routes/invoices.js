const express = require('express');

const {
    getInvoices,
    createInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoices');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
.get(getInvoices)
.post(protect, authorize('admin'), createInvoice);

router.route('/:id')
.get(getInvoice)
.put(protect, authorize('admin'), updateInvoice)
.delete(protect, authorize('admin'), deleteInvoice);

module.exports = router;