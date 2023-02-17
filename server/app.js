require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { CURRENT_BD_ADRESS } = require('./utils/config');

const { PORT = 3001 } = process.env;
const app = express();

// const allowedCors = [
//   'https://myflicks.nomoredomains.sbs',
//   'http://myflicks.nomoredomains.sbs',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.end();
//     return;
//   }
//   next();
// });

mongoose.connect(CURRENT_BD_ADRESS, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(router);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
