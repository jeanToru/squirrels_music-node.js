const FavoriteMusic = require('../models/favoriteMusic.model')
const mongoose = require('mongoose')

const favoriteMusicService = {}


favoriteMusicService.getFavoriteMusicbyUser = async function ({idUser}) {
    try {
        const favoriteMusic = await FavoriteMusic.find({idUser: mongoose.Types.ObjectId(idUser)})
        return favoriteMusic;
    } catch (e) {
        throw Error('Error while Paginating Favorite Music')
    }
}

async function findUser(idUser) {
    try {
        const user = FavoriteMusic.findOne({ idUser: mongoose.Types.ObjectId(idUser) })
        return user ? user : null
    } catch (e) {
        throw new Error('Error while getting user')
    }
}

async function createFavoriteMusic(idUser, songs) {
    try {
        const favoriteMusic = new FavoriteMusic({ idUser, songs })
        const newFavoriteMusic = await favoriteMusic.save();
        return newFavoriteMusic
    } catch (e) {
        throw new Error('Error while save favorite Music')
    }
}

async function updateFavoriteMusic(user, songs) {
    try {
        user.songs.push(songs.toString())
        await user.save();
        return user;
    } catch (e) {
        throw new Error('Error save favorite Music')
    }
}

async function deleteFavoriteMusic (user, song) {
    try {
        user.songs.pull(song);
        user.save()
        return user;
    } catch (e) {
        throw Error('Error while delete Favorite Music')
    }
}

favoriteMusicService.upsertFavoriteMusic = async function ({ idUser, songs }) {
    try {
        const user = await findUser(idUser);
        if (user) {
            return await updateFavoriteMusic(user, songs);
        }
        return await createFavoriteMusic(idUser, songs);
    } catch (e) {
        throw new Error('Error while save favorite Music')
    }
}


favoriteMusicService.deleteFavoriteMusicByUserAndSong  = async function ({idUser, song}) {
    try {
        const user = await findUser (idUser) 
        if (user){
            return deleteFavoriteMusic(user, song)
        }
    } catch (e) {

        throw Error('Error while save Favorite Music')
    }
} 

module.exports = favoriteMusicService;