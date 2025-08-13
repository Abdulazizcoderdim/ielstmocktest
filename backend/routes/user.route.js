const userController = require("../controller/user.controller");

const router = require("express").Router();

router.get("/test", userController.test);
router.post("/submit", userController.submit);

module.exports = router;
