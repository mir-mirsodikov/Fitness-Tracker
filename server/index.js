const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const activitiesRoute = require('./routes/activities.js');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/activities', activitiesRoute);

app.get('/', (req, res) => {
    res.send('This is the home page');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));