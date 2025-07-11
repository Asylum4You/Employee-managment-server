const express = require("express");
const { createPaymentRequest, getPaymentsForMonth, paySalary } = require("../controller/paymentRequest.controller");

const router = express.Router();

router.post("/payments-request", createPaymentRequest);
router.get('/payments/monthly', getPaymentsForMonth);
router.post("/payments/pay/:paymentRequestId", paySalary); 

module.exports = router;
