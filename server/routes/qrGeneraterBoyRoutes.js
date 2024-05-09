const express = require("express");
const router = express.Router();
const {registerQrGeneraterBoy, loginUser, currentUser} = require("../controllers/qrGeneratorBoySignupController");
const validateToken = require("../middleware/qrGeneraterBoyValidateTokenHandler");

// Register
router.post("/register", registerQrGeneraterBoy);

//Login
router.post("/login",loginUser);

    // Current user information

    router.get("/current",validateToken, currentUser);


        module.exports = router