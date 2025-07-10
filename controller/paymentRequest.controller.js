// const PaymentRequest = require("../model/paymentRequest");

// exports.createPaymentRequest = async (req, res) => {
//   const {
//     employeeId,
//     employeeName,
//     employeeEmail,
//     salary,
//     bankAccount,
//     month,
//     year,
//     paymentRequestedBy,
//   } = req.body;

//   try {
//     const paymentRequest = new PaymentRequest({
//       employeeId,
//       employeeName,
//       employeeEmail,
//       salary,
//       bankAccount,
//       month,
//       year,
//       paymentRequestedBy,
//     });

//     await paymentRequest.save();

//     res.status(201).json({
//       message: "Payment request created successfully",
//       paymentRequest,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Server error. Unable to create payment request." });
//   }
// };
