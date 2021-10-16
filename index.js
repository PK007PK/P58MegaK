/*
Middleware

Na chwilę powrót do aplikacji w dot kształcie. 
Posiada on metodę app.use() - jest ona dosyć zaawansowana i
pozwala na wiele. Pozwala także rejestrować middleware.

Robi się to zazwyczaj takim kodem"
app.use(jakisMiddleware());
przed kodem właściwym
*/
const express = require('express');
function program1() {
    const app = express();

    app.use(middleware1());
    let name;
    app.get('/name/set/:name', (req,res)=>{
        name = req.params.name;
        res.send(name);
    })
    app.get('/name/show', (req,res)=>{
        res.send(name);
    })
    app.get('/name/check', (req,res)=>{
        if (name) {
            res.send('There is a name saved.');
        } else {
            res.send('There is no name.');
        }
    })
    app.listen(3000);
}

/*
Aby móc odbierać i z łatwością odczytywać dane wejściowe od
klienta, które są w postaci JSONa (a często tak będzie) - możemy wykorzystać wbudowany
express middleware json.

Znajdziemy go w express.json(). Opcjonalny argument pozwala
nam na podanie opcji - min jaka jest max wielkość JSON-a (domyślnie 100kb).

Domyślne działanie jest w większości przypadków wystarczjące. Gdy dostaniemy
zapytanie z danymi określonymi jako application/json to ten middlewart
automatycznie rozkoduje je do danych.
*/


/*
Inspomnią wysyłamy JSONa...
*/

function program1() {
    const app = express();

    app.use(express.json()); // Robimy, żeby on teraz rozumiał JSONa
    //który przychodzi. JSONa rozkoduje teraz do obiektu JS. 
    /*
    Po rejestracji tego middleware w obiekcie request pojawi się nowy
    obiekt req.body - będzie zawierać rozkodowane dane, o ile 
    przybyły one w zapytaniu z danycmi o typie
    application/json

    teraz można z nimi zrobić cokolwiek, np odpowiedzieć 
    również jsonem:
    */

    app.post('/book', (req,res)=>{
        console.log(req.body);
        res.send('ok');
        res.json({
            text: `Hello, ${req.body.name}`,
        })
    })

    app.listen(3000);
}

/*
Kolejnym middleware są pliki stsatyczne. MD plików statycznych. Już wcześniej wytsyłaliśmy sobie
html, czy pojedyncze pliki graficzne. Jak łątwo się domyślić takie
przesyłanie plików byłoby bnardzo niewygodne i zaciemniało by kod. 

Właśnie dlatego Express ma wbudowane middleware plików
statycznych - czyli takich, które są serwowane identycznie
dla każdego klienta pod danym adresem.

Zazwyczaj właśnie w ten sposób serwujemy cały frontend mając go
po prostu w innym folderze. 

ten middleware jest dostępny pod funkcją express.static().
Należy jako argument podać folder plików statycznych. 

Ma on opcjonalnie jako drugi parametr obiekt opcji, dzięi którym
można min wybrać stonę główną, ograniczyć widzialność plików z kropką
na początku, czy sterować cachem. 

W więszości przypadków jednak ustawienia domyślne są wystarczające
i wystarczy wpisać: app.use(express.static());
*/

function program2() {
    const app = express();
    app.use(express.static('public', {
        //index: false, nie będdzie domyślnego
        //index:home.html, ...
    })); 

    app.post('/book', (req,res)=>{
        console.log(req.body);
        res.send('ok');
        res.json({
            text: `Hello, ${req.body.name}`,
        })
    })

    app.listen(3000);
}

//http://localhost:3000/index.html 
//http://localhost:3000 kieruje do index.html domyślnie
//program2()

/*
Middleware - odczyt ciasteczek
Aby włączyć obsługę ciastek w express js należy doinstalować dodatkowy
moduł o nazwie cookie-parser. Zawiera on middleware do express
npm i cookie-parser

Od teraz ciastka będą dostępne w obiekcie request pod nazwą
req.cookies, a ciastka tzw podpisane pod req.signedCookies.

Jest to obiekt w którym klucze to nazwy ciastek a wartości to ich wartości

Klientpowinien automatycznie przesłać wszystkoe ciastka dostęne naszemu
serwerowi przy każdym zapytaniu, a cookie-parser zadba byśmy mieli
do nich dostęp.
*/

const cookieParser = require('cookie-parser');

function program3() {
    const app = express();
    app.use(express.static('public', {
        //index: false, nie będdzie domyślnego
        //index:home.html, ...
    })); 
    app.use(cookieParser());

    app.get('/book', (req,res)=>{
        console.log(req.body);
        res.send('ok');
        res.json({
            text: `Hello, ${req.body.name}`,
        })
        console.log(req.cookies);
        console.log(req.cookies.cookie2);
    })

    app.listen(3000);
}

/*
Zadanie 1. Ankieta. Stwórz aplikację ex. Powinna ona serwować statycvznie pliki z folderu 
./public/. na stronie głównem możliwe jest głosowanie w ankiecie
Obsłuż głosowanie tak, żeby przejście do której kolwiek ścieżki /vote/yes vote/no 
powodowało oddanie dłosu do odpowiedniej opcji. Zwróć do przzeglądarki
Dziękujemy za głos. 

Na ścieżce /votes/check yświetl wyniki ankiety - ilość głosów oddana
na każdą opcję. 

*W jaki sposób zaimplementować trzecią opcję żeby się nie powtarzać?
** Sprawić, żeby każdy mógł głosować tylko raz req.ip
*/


/*
Zadanie 2. Stwórz taką aplikację express, która ma pliki statyczne serwowane ze 
ścieżki ./public/zadanie01/. Na stronie głównej wyświetlaj formularz w którym można
podać dwie liczby. 

Powysłaniu formularza powinieneś sprawdzić, czy liczba B jest dzielnikiem liczby a.
i wyświetlić odpowiednią informację w przeglądarce użytkownika. 
*/