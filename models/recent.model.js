const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentSchema = mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        require: true
    },
    songs: [String]
}, { versionKey: false });

const Recentlist = mongoose.model("Recentlist", RecentSchema);
module.exports = Recentlist;