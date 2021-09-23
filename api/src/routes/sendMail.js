const { Router } = require("express");

const {
  registerEmail,
  helpEmail,
  paymentEmail,
  passResetEmail,
  orderDispatchEmail,
} = require("../controllers/mailControllers.js");

const router = Router();

router.post("/sendRegisterEmail", registerEmail);
router.post("/sendHelpEmail", helpEmail);
router.post("/sendPaymentEmail", paymentEmail);
router.post("/sendPassResetEmail", passResetEmail);
router.post("/sendOrderDispatchEmail", orderDispatchEmail);

module.exports = router;
