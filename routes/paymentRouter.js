const express = require("express");
const { createPaymentRequest, getPaymentsForMonth } = require("../controller/paymentRequest.controller");

const router = express.Router();

router.post("/payments-request", createPaymentRequest);
router.get('/payments/monthly', getPaymentsForMonth);

module.exports = router;
