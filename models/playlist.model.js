const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    songs: [String]
}, { versionKey: false });

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;