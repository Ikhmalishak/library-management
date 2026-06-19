const express = require("express");
const memberController = require("../controllers/member.controller");
const router = express.Router();

router.get('/',memberController.index);
router.post('/create',memberController.create);
router.put('/update',memberController.update);

module.exports = router;
