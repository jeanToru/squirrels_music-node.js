const express = require('express');
const router = express.Router();
const favoriteMusicController = require('../controllers/favoriteMusic.controller')

router.put('/favorite-music', favoriteMusicController.upser)
router.get('/favorite-music/:idUser', favoriteMusicController.getFavoriteMusicByUser)
router.delete('/favorite-music/:idUser/song/:song', favoriteMusicController.deleteFavoriteMusicByUserAndSong)
module.exports = router;