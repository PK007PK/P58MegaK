/*
Przykładowe poprawne ścieżki:
GET/user - lista użytkowników;
GET/user/123 - użytkownik o id 123
POST/user - dodaj użytkopwnika
PUP/PATCH/user/123 - zastąp/nadpisz/zmień użytkownika 123
Delete/USER/123 - usuń użytkownika o ID 123

Poprawne kody odpowiedzi w HTTP i w REST
200 - ok;
201 - ok, dodano
400 - bład wejścia (użytkownika)
404 - błąd wejścia polegający na niepoprawbym id - kiedy nie ma np użytkownika. 
500 - fatalny błąd serwera

W poprzednim zadaniu złamaliśmy praktycznie wszystkie zasady resta... 
*/

const express = require('express');
const hbs = require('express-handlebars');
const { clientRouter } = require('./routers/client');

const app = express();
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('.hbs', hbs({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');


app.use('/client', clientRouter)

app.listen(3000, 'localhost', () => console.log("Listening on http://localhost:3000"))

