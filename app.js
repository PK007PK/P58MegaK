const express = require('express');
const cookieParser = require('cookie-parser');
const { cookieRouter } = require('./routes/cookie');

function program1() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(express.urlencoded({
        extended: true,
    })); // to pozwoli odczytać ten formularz. Używamy tylko wtedy, kiedy mamy tradycyjny formularz jak w tym htmlu
    app.use('/cookie', cookieRouter);
    app.listen(3000);
}
program1()
