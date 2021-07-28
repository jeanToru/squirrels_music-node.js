const favoriteMusicService = require('../services/favoriteMusic.service')

const FavoriteMusicController = {};

FavoriteMusicController.upser = async function (req, res, next) {
    try {
        const upserFavoriteMusic = await favoriteMusicService.upsertFavoriteMusic(req.body);
        return res.status(201).json({ status: 201, data: upserFavoriteMusic })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }

}

FavoriteMusicController.getFavoriteMusicByUser = async function (req, res, next) {
    try {
        const favoriteMusic = await favoriteMusicService.getFavoriteMusicbyUser(req.params)
        return res.status(200).json({ status: 200, data: favoriteMusic, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

FavoriteMusicController.deleteFavoriteMusicByUserAndSong = async function (req, res, next) {
    try {
        const favoriteMusic = await favoriteMusicService.deleteFavoriteMusicByUserAndSong(req.params)
        return res.status(202).json({ status: 202, data: favoriteMusic, message: "Item removed successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = FavoriteMusicController;