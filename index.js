/*
Ogólnie o ekspresie

Express - framework NODa. NODE - środowisko uruchomieniowe JS. 
Inne frameworki NODOwe też częst działają na ekspresie, np nest. 
Na ten momnent wersji 5 alfa Expresa nie ruszać. Jest rozwijana 
od wielu lat i bardzo powoli idzie. 

npm i express

Ekspresa obsługujemy trochę inaczej niż inne paczki. 
Pobieramy cały moduł:
*/

const express = require('express');

/*
Express jako jedna wielka funkcja tworząca web serwer (?):
app.listen uruchomi połączenie na świat :)

Do testowania można wykorzystać Insomnie
*/

function program1() {
    const app = express();
    app.get('/', ()=>{ //Nasłuch na / i metodę get
        console.log('Witaj, Świecie');
    })

    app.listen('3000'); //Dobrą praktyką jest dawanie tego na końcu
    /*
    Co się dzieje w tym programie:
    - pobieramy cały ekspres,
    - ustawiamy nasłuch get na ścieżkę główną "/",
    - tam uruchamia się nasza funkcja,
    */
}

//program1();


//W programie 2 łatwo dodamy kolejne funkcjonalności: 

function program2() {
    const app = express();
    /*
    Mogą istnieć dwa różne adresy, ale różnią się metorą i są to
    wtedy dwa różne zasoby. 
    */

    app.get('/', ()=>{ 
        console.log('Wyświetl listę książek');
    })

    app.post('/', ()=>{ 
        console.log('Dodaj nową książkę do listy');
    })

    app.get('/hello', ()=>{ 
        console.log('Cześć!');
    })

    app.listen('3000'); 
}

program2();