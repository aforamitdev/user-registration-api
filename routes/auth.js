const router = require("express").Router();
const { userRegister, login } = require("../controller/user");
router.post("/register", userRegister);

router.post("/login", login);

module.exports = router;
