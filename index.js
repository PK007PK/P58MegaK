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
const { handlebarsHelpers } = require('./utils/handlebars-helpers');

const app = express();
app.use(express.json()); //Nie korzystamy z niego, ale nie przeszkadza w niczym . Te i kilka poniższych konfiguracji zawsze mają być nad naszymi ścieżkami
app.use(express.static('public')); //Mamy ich w naszej apce mało(plików graficznych, cssów, ale są. Public to jest slash). public jest początkiem ścieżki do plików, public to "/"
app.use(cookieParser()); //Służy żeby obsłużyć ciasteczka przychodzące
app.engine('.hbs', hbs({extname: '.hbs', helpers: handlebarsHelpers})); 
/*
Powyżej:
1. Rejestrujkemy silnik do wyświetlania widoków;
2. W przekazanym obiekcie podajemy opcje i zmieniamy nieco konfigurację np
- ustawiamy extname jako domyślną nazwę plików, dzięki temu nie podajemy potem
w kodzie wszędzie hbs. 
- pokazujemy gdzie są helpery

*/
app.set('view engine', '.hbs');

app.use('/', homeRouter); //wszystkie ścieżki które zaczynają się od / ma trafiać do homeRouter
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);
// app.listen(3000); poniżej robinmy tak, żeby mozna było kliknąć na console loga. 
app.listen(3000, "localhost", ()=>{
    console.log("Listening on http://localhost:3000");
});

