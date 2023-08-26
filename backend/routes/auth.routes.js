const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const AuthController = require("../Controllers/AuthController");

router.post(
  "/login",
  [
    check("email", "Введен некорректный email при входе в аккаунт")
      .normalizeEmail()
      .isEmail(),
    check("password", "Введен неверный пароль при входе в аккаунт").exists(),
  ],
  AuthController.login
);

router.post(
  "/registration",
  [
    check("username", "Вы должны ввести имя пользователя").exists(),
    check("email", "Некорректная почта").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({
      min: 8,
    }),
  ],
  AuthController.registration
);

module.exports = router;
