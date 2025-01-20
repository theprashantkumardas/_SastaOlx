const express = require('express');
const {createRazorpayOrder} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-order',authMiddleware, createRazorpayOrder);
module.exports = router;