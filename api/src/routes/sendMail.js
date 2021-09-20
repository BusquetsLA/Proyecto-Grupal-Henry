const { Router } = require("express");

const {
  registerEmail,
  helpEmail,
  paymentEmail,
  passResetEmail,
} = require("../controllers/mailControllers.js");

const router = Router();

router.post("/sendRegisterEmail", registerEmail);
router.post("/sendHelpEmail", helpEmail);
router.post("/sendPaymentEmail", paymentEmail);
router.post("/sendPassResetEmail", passResetEmail);

module.exports = router;
