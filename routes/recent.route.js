const express = require('express');
const router = express.Router();
const recentController = require('../controllers/recent.controller')

router.put('/recent', recentController.upser)
router.get('/recent/:userId', recentController.getRecent);

module.exports = router;