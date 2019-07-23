const router = require("express").Router();
const { userRegister } = require("../controller/user");
router.post("/register", userRegister);

router.post("/login", (req, res) => {});

module.exports = router;
