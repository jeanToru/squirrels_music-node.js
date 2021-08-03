const Recent = require('../models/recent.model')
const mongoose = require('mongoose')

const RecentService = {}

async function findUser(idUser) {
    try {
        const user = Recent.findOne({ idUser: mongoose.Types.ObjectId(idUser) })
        return user ? user : null
    } catch (e) {
        throw new Error('Error while getting user')
    }
}

async function createRecent(idUser, songs) {
    try {
        const recent = new Recent({ idUser, songs })
        const newRecent = await recent.save();
        return newRecent
    } catch (e) {
        throw new Error('Error while save favorite Music')
    }
}

async function updateRecent(user, songs) {
    try {
        user.songs.push(songs.toString())
        await user.save();
        return user;
    } catch (e) {
        throw new Error('Error save recent Music')
    }
}

RecentService.upsertRecent = async function ({ idUser, songs }) {
    try {
        const user = await findUser(idUser);
        if (user) {
            return await updateRecent(user, songs);
        }
        return await createRecent(idUser, songs);
    } catch (e) {
        throw new Error('Error while save recent Music')
    }
}

RecentService.getRecent = async function ({ userId }) {
    try {
        const recent = await Recent.findOne({ userId: `${userId}` });
        return recent;
    } catch (e) {
        throw new Error('Error while returning recents');
    }
};

module.exports = RecentService;