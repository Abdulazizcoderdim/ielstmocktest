const adminController = require("../controller/admin.controller");
const { body, param } = require("express-validator");
const validationError = require("../middleware/validationError");

const router = require("express").Router();

router.post(
  "/questions",
  body("text").trim().notEmpty().withMessage("Question text is required"),
  body("options")
    .isArray({ min: 2 })
    .withMessage("At least 2 options are required"),
  body("correctAnswerIndex")
    .isInt({ min: 0 })
    .withMessage("Valid correct answer index is required"),
  validationError,
  adminController.createQuestion
);
router.get("/questions", validationError, adminController.getQuestions);
router.get(
  "/questions/:id",
  param("id").isMongoId().withMessage("Valid question ID is required"),
  validationError,
  adminController.getQuestionById
);
router.put(
  "/questions/:id",
  param("id").isMongoId().withMessage("Valid question ID is required"),
  validationError,
  adminController.updateQuestion
);
router.delete(
  "/questions/:id",
  param("id").isMongoId().withMessage("Valid question ID is required"),
  validationError,
  adminController.deleteQuestion
);

module.exports = router;
