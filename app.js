const express = require('express');
const eventsRoute = require('./routes/events');
const mongoose = require('mongoose');
require('dotenv/config')
const { MongoMemoryServer } = require('mongodb-memory-server');

const eventController = require('./controllers/eventController')
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/events', eventsRoute);

app.get('/', (req, res) => {
    console.log('Home');
});

const getMongoUri = (mode) => {
    return new Promise((resolve, reject) => {
        if (mode === 'memory') {
            MongoMemoryServer.create()
                .then((mongoServer) => {
                    const uri = mongoServer.getUri();
                    resolve(uri)
                });
        } else {
            resolve(process.env.DB_CONNECTION);
        }
    });
}

getMongoUri(process.env.DB_CONNECTION_TYPE).then(uri => {
    try {
        mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log('Connected to database', uri));
        if (process.env.TEST_DATA === 'true') {
            eventController.insertTestData();
        }

    } catch (err) {
        console.log('Error', err)
    }
});

app.listen(process.env.SERVER_PORT);

module.exports = app;
