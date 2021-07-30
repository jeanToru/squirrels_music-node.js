const playlistService = require('../services/playlist.service')

const playlistController = {};

playlistController.create = async function (req, res, next) {
    try {
        const playlist = await playlistService.createPlaylist(req.body)
        return res.status(201).json({ playlist })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}


playlistController.getPlaylists = async function (req, res, next) {
    try {
        const playlists = await playlistService.getPlaylists();
        return res.status(201).json({ status: 200, data: playlists, message: 'Successfully playlists restrived'})
    }catch(error){
        return res.status(400).json({status: 400, message: error.message})
    }  
}

playlistController.getPlaylist = async function(req,res,next){
    try{
        const playlist = await playlistService.getPlaylist(req.params);
        if(playlist == null){
            return res.status(400).json({ message: 'Cannot find playlists'})
        }
        return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlists restrived' });
    }catch(e){
        return res.status(400).json({status:400, message: e.message})
    }
}

playlistController.upser = async function (req, res, next) {
    try {
        const upserPlaylist = await playlistService.upsertPlaylist(req.body);
        return res.status(201).json({ status: 201, data: upserPlaylist })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}

playlistController.deleteSong= async function (req, res, next) {
    try {
        const deleteSong = await playlistService.deletePlaylistSong(req.params)
        return res.status(202).json({ status: 202, data: deleteSong, message: "Item removed successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

playlistController.deletePlaylist = async function (req, res, next){ 
    try{
        const  playlist = await  playlistService.delatePlaylist(req.params)
        return res.status(200).json({status: 200, data:  playlist, message: "Successfully deleted playlist"})
  
    }   catch(error){
        return res.status(400).json({status:400, message: error.message})
    }
}

module.exports = playlistController;