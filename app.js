require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const favoriteRoute = require('./routes/favoriteMusic.route');
const playlist = require('./routes/playlist.route');
const recentRoute = require('./routes/recent.route');
const app = express();

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connection to db established'));

app.use(express.json());
app.use(express.urlencoded({
    type: 'app;ication/x-www-form-urlencoded',
    extended: true
}))

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
            'X-Password-Expired'
        ],
        optionsSuccessStatus: 200
    })
)

app.use('/', userRoute);
app.use('/', favoriteRoute);
app.use('/', playlist);
app.use('/', recentRoute);

app.use('*', (req, res) => {
    res.status(404)
    res.send('Path cannot found')
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server runnig on ${HOSTNAME}:${PORT}`);
})
