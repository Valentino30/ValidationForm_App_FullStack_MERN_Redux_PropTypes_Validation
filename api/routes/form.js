const express = require("express");
const form = require("../controllers/form");

const router = express.Router();

router.post("/", form.submit);

module.exports = router;
