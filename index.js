/*
Cookies
*/

const express = require('express');

function program1() {
    const app = express();
    app.get('/', (req,res)=>{
        res.cookie('ciastko', 'czekoladowe');
        res.send('Hello world');
    })

    app.listen(3000);
}

//program1();

/*
Ciastko sesyjne oznacza, że po wyłączeniu sesji zniknie. 
Po wyłączeniu przeglądarki. Sesyjne służą też do logowania. 
FB ciasteczko pewnie nigdy nie wygaśnie. A bankowe zawsze
będzie sesyjne. 

Opcje ciastek.  Ciastka mogą być bardziej zaawansowane. 
Oprócz nazwy i wartości mogą mieć obiekt opcji ciastek. 

Podsatawowe opcje to:
- domain: domena do której będą wysyłane ciastka;
- expires - czas do kiedy ciastko ma być zapamiętane;
- maxAge: zamiast expires, określa jak długo ciastko ma istnieć;
Jeżeli podamy jedno z dwóch powyższych to ciastko przestaje być sesyjne. 
- httpOnly - ciekawa opcja, która sprawi, że frontend nie ma 
dostępu do ciastka. 
- innne 
*/

function program2() {
    const app = express();
    app.get('/', (req,res)=>{
        res.cookie('cookie1', 'XXXC', {
            path: "/", //ma istnieć na każdej podstronie;
            domain: "xyz.mydomain.com", //Tylko ta domena odczyta ciastko
            expires: new Date(2022, 11, 31),  // miesiące w JS liczymy od 0, czyli jak damy tu 12 zamiast 11 to będzie zabawa
            maxAge: 1000 * 60 * 60 * 24 * 365, //Jeden rok zaczynając od 1s;
            httpOnly: true, //Najlepiej do wszystkiego co ma związek z logowaniem. 
            // document.cookie zwraca nam wszystkie cookies, chyba że mają 
            // httpOnly. Ma to znaczenie, bo mamy np masę pluginów. One mają 
            //dostęp do tego co się na froncie dzieje. Jak je ktoś przejmie to
            //sobie zaluka. Front nie ma dostępu do ciastka. 
            secure: true, //Jeżeli nie korzystamy z https-a to nie przesyłamy ciastka
        });
        res.cookie('cookie2', 'ABC', {
            path: "/",
            domain: "xyz.mydomain.com", 
            expires: new Date(2022, 11, 31),  
            maxAge: 1000 * 60 * 60 * 24 * 365,
            
            // 
        });
        res.send('Hello world');
    })

    app.listen(3000);
}

//program2();


/*
res.clearCookie()
Aby usunąć już stworzone wcześniej ciastko (np ktoś się wylogował) -
używamy metody res.clearCookie().

Jako argument przyjmuje on nazwę ciastka. Można opcjonalnie 
podać drugi argument - identyczny z res.cookie();
*/

function program3() {
    const app = express();
    app.get('/', (req,res)=>{
        res.cookie('cookie1', 'XXXC', {
            path: "/", //ma istnieć na każdej podstronie;
            domain: "xyz.mydomain.com", //Tylko ta domena odczyta ciastko
            expires: new Date(2022, 11, 31),  // miesiące w JS liczymy od 0, czyli jak damy tu 12 zamiast 11 to będzie zabawa
            maxAge: 1000 * 60 * 60 * 24 * 365, //Jeden rok zaczynając od 1s;
            httpOnly: true, //Najlepiej do wszystkiego co ma związek z logowaniem. 
            // document.cookie zwraca nam wszystkie cookies, chyba że mają 
            // httpOnly. Ma to znaczenie, bo mamy np masę pluginów. One mają 
            //dostęp do tego co się na froncie dzieje. Jak je ktoś przejmie to
            //sobie zaluka. Front nie ma dostępu do ciastka. 
            secure: true, //Jeżeli nie korzystamy z https-a to nie przesyłamy ciastka
        });
        res.send('Hello world');
    })
    app.get('/logout', (req,res)=>{
        res.clearCookie('cookie1');
        res.send('Loged out');
    })
    app.listen(3000);
}

//program3();


/*
Odczytanie ciastka z poziomu programu
Zadanie 1. Dodawanie ze ścieżki. 
Stwórz taką aplikację Express, która potrafi przyjąć w ścieżce dwie liczy.
Następnie odbierz je, zsumuj, a sumę wyświetl w przeglądarce. 

Pamiętaj, że parametry są zwracane jako string. Potrzebujesz więc użyć np. 
parseInt(), żeby zmienić je w liczby. 
*/

function program4() {
    const app = express();
    app.get('/:numA/:numB', (req,res)=>{
        console.log(req.params);
        const {numA, numB} = req.params;
        const sum = Number(numA) + Number(numB);
        //res.send(sum); to da błąd. Bo musimy wysłać tekst
        res.send(`${sum}`); 
    })
    app.get('/logout', (req,res)=>{
        res.clearCookie('cookie1');
        res.send('Loged out');
    })
    app.listen(3000);
}

/*
Zadanie 2. Przepraszam, jak masz na imię?
Stwórz taką aplikację Express, która ma trzy ścieżki:
'name/set/:name' - zapamiętuje ona w programie podane imię
oraz wyświetla je w przeglądarce. 

'/name/show' - wyświetla ona podane wcześniej imię.

'/name/check' - wuświetla informację czy imię zostzało już zapisane
w programie czy nie. 
*/

function program5() {
    const app = express();

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

//Dodajemy zapisywanie do pliku

const {readFile, writeFile} = require('fs').promises;

function program6() {
    const app = express();

    let name;
    app.get('/name/set/:name', async (req,res)=>{
        const name = req.params.name;
        await writeFile('name.txt', name, 'utf8');
        res.send(name);
    })
    app.get('/name/show', async (req,res)=>{
        /* const name = await readFile('name.txt', 'utf8');
        res.send(name); lub szybciej: */
        res.send(await readFile('name.txt', 'utf8'));
    })
    app.get('/name/check', async (req,res)=>{
        try {
            await readFile('name.txt');
            res.send('There is a name saved.');
        } catch(e) {
            res.send('There is no name.');
        }
         
    })
    app.listen(3000);
}