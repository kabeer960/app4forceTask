const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { login, signUp } = require("../../controllers/auth.js");
const { validateRequest } = require("../../middleware/validateRequest.js");
// router.get('/', (req, res)=>{
//   res.send("sdkjhdl");
// })
router.post(
  "/login",
  [
    body("email", "Email is not valid")
      .notEmpty()
      .withMessage("Email is required")
      .if(body("email").notEmpty())
      .isEmail()
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

router.post(
  "/sign-up",
  [
    body("email", "Email is not valid")
      .notEmpty()
      .withMessage("Email is required")
      .if(body("email").notEmpty())
      .isEmail()
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    // body("nickname").notEmpty().withMessage("Nickname is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
  ],
  validateRequest,
  signUp
);

module.exports = router;
