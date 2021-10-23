/*
Konfigurator ciastek
https://docs.google.com/document/d/1ItcySUO9ZdCPYuQ9x-qwi9DFpaNspa0O5z2XrVGBaEU/edit#
https://drive.google.com/file/d/1AxGnkOOlBKWc2sHBmHFBlzYmztN9za3Y/view


*/

const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const { homeRouter } = require('./routes/home');
const { configuratorRouter } = require('./routes/configurator');
const { orderRouter } = require('./routes/order');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);
app.listen(3000);

