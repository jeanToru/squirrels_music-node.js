const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller')

router.post('/playlist', playlistController.create)
router.get('/playlist', playlistController.getPlaylists)
router.get('/playlist/:id', playlistController.getPlaylist)
router.put('/playlist', playlistController.upser)
router.delete('/playlist/:id', playlistController.deletePlaylist);
router.delete('/playlist/:idUser/song/:song', playlistController.deleteSong)

module.exports = router;