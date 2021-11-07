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
const methodOverride = require('method-override'); // To jest po to, aby można było obsłużyc put
//formularze da się wysyłać tylko jako get lub post. Inne metody wymagają powyższego. 

const {clientRouter} = require('./routers/client');
const {homeRouter} = require('./routers/home');
const {db} = require('./utils/db');
const {handleError} = require('./utils/errors');

const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ //to nam pozwala obsługiwać formularze
    extended: true,
}));
app.use(express.static('public')); //Folder public staje się folderem głównym
app.engine('.hbs', hbs({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');


app.use('/', homeRouter)
app.use('/client', clientRouter)
app.get('/test', (req,res) => {
    res.send(JSON.stringify(db.getAll()));
})

app.use(handleError); //Musi być na końcu ale przed listen
//to jak działa, że właśnie tu, jaki jest jego szablon wynika z konstrukcji ekspresa
//tego midleware sami zdefiniowaliśmy w errorze

app.listen(3000, 'localhost', () => console.log("Listening on http://localhost:3000"))

