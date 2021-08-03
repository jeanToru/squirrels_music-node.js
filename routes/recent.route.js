const express = require('express');
const router = express.Router();
const recentController = require('../controllers/recent.controller')

router.put('/recent', recentController.upser)
router.get('/recent/:idUser', recentController.getRecent);

module.exports = router;