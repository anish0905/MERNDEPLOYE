const express = require("express");
const router = express.Router();
const { getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale  } = require("../controllers/salesController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getSales);

router.route("/").post(createSale);

router.route("/:id").get( getSaleById);

router.route("/:id").put(updateSale);

router.route("/:id").delete(  deleteSale );



module.exports = router;