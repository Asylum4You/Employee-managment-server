const express = require("express");
const {
  createPaymentRequest,
  getPaymentHistory,
  createPaymentIntent,
  updatePaymentStatus,
} = require("../controller/paymentRequest.controller");
const { verifyJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/payments-request", verifyJWT, createPaymentRequest);
router.post("/payments/create-payment-intent", verifyJWT, createPaymentIntent);
router.patch("/payments/:id/update-payment-status", updatePaymentStatus);
router.get("/payment-history", verifyJWT, getPaymentHistory);

module.exports = router;
