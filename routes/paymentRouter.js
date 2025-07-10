const express = require("express");
const { createPaymentRequest } = require("../controller/paymentRequest.controller");

const router = express.Router();

router.post("/payment-request", createPaymentRequest);

module.exports = router;
