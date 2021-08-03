const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller')

router.post('/playlist', playlistController.create)
router.get('/playlist/:id', playlistController.getPlaylist)
router.put('/playlist', playlistController.upser)
router.delete('/playlist/:id', playlistController.deletePlaylist);
router.delete('/playlist/:id/song/:song', playlistController.deleteSong)

module.exports = router;