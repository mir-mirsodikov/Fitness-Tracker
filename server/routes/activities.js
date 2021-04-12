const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
require('dotenv').config({ path: __dirname + '/./../../.env'});

router.get('/', async (req, res) => {
    const activities = await loadActivities();
    res.send(await activities.find({}).toArray());
});

router.post('/', async (req, res) => {
    const activities = await loadActivities();
    await activities.insertOne({
        date: new Date(req.body.date),
        activities: req.body.activities
    });
    res.status(201).send();
});

async function loadActivities() {
    const client = await mongodb.MongoClient.connect(
        process.env.DB_CONNECT,
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    );

    return client.db('activities').collection('activities');
}

module.exports = router;