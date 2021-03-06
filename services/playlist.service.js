const Playlist = require('../models/playlist.model')
const mongoose = require('mongoose');

const PlaylistService = {}


async function findUser(idUser) {
    try {
        const user = Playlist.findOne({ idUser: mongoose.Types.ObjectId(idUser) })
        return user ? user : null
    } catch (e) {
        throw new Error('Error while getting user')
    }
}

async function updatePlaylist(playlist, songs) {
    try {
        playlist.songs.push(songs.toString())
        await playlist.save();
        return playlist;
    } catch (e) {
        throw new Error('Error Update playlist')
    }
}

async function deleteSongdelatePlaylist(playlist, song) {
    try {
        playlist.songs.pull(song);
        playlist.save()
        return playlist;
    } catch (e) {
        throw Error('Error while delete Favorite Music')
    }
}

PlaylistService.createPlaylist = async function ({ idUser, name, songs }) {
    try {
        const playlist = new Playlist({ idUser, name, songs });
        const newPlaylist = await playlist.save();
        return newPlaylist;
    } catch (e) {
        throw new Error('Error while save Playlist');
    }
}


PlaylistService.getPlaylistByUser = async function ({ idUser }) {
    try {
        const playlists = await Playlist.find({ idUser: { $eq: mongoose.Types.ObjectId(idUser) } });
        return playlists.map(playlists => {
            let getPlaylistUser = JSON.parse(JSON.stringify(playlists));
            return getPlaylistUser;
        });
    } catch (e) {
        throw new Error('Error while returning playlist');
    }
};

PlaylistService.getPlaylist = async function ({ id }) {
    try {
        const playlist = await Playlist.findById(id)
        return playlist;
    } catch (error) {
        throw new Error('Error while getting User')
    }
};

PlaylistService.upsertPlaylist = async function ({ id, songs }) {
    const playlist = await Playlist.findById(id)
    try {
        return await updatePlaylist(playlist, songs);
    }
    catch (e) {
        throw new Error('Error while playlist')
    }
}

PlaylistService.deletePlaylistSong = async function ({ id, song }) {
    const playlist = await Playlist.findById(id)
    try {
        return await deleteSongdelatePlaylist(playlist, song);
    }
    catch (e) {
        throw new Error('Error while playlist')
    }
}

PlaylistService.delatePlaylist = async function ({ id }) {
    try {
        const user = await Playlist.findByIdAndRemove(id);
        return user
    } catch (e) {
        throw new Error('Error while delete Playlist');
    }
};

module.exports = PlaylistService;