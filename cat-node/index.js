require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URL
}));


//load routes
require('./app/routes')(app);

//launch app
const port = process.env.PORT;
app.listen(port, () => {
  console.log('live on port ' + port);
});