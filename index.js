/*
#Obiekt request

req w callbacku ekspresowy to nie to samo co req nodowy. 
Ekspresowy jest znacznie zasobniejszy. 

Koncepcja podobna do tej z obiektem req / request w Node.js -
otrzymujemy parametr w callbacku każdego zdarzenia.

Najczęściej nazywa się go właśnie req.
Jest on typu Request i reprezentuje każde zapytanie HTTP.

Zobaczmy co się w nim znajduje:
*/

const express = require('express');

function program1() {
    const app = express();
    /*
    Mogą istnieć dwa różne adresy, ale różnią się metorą i są to
    wtedy dwa różne zasoby. 

    poniższego logi odpalamy kiedy insomia lub przeglądarka odezwie się do serwera.
    */

    app.get('/', (req)=>{ 
        console.log(req);
        console.log(req.hostname); //Nazwa sieciowa, tu localhost; Pozwala zorientować się przy 
        //rozproszonych serwerach na której maszynie jesteśmy

        console.log(req.ip); //adres ip klienta, urządzenia z którego wysłano zapytanie do serv
        //Czasem serv proxy potrafi nadpisać i ukryć info o ip - tzn u nas, odpalamy serv, ale mamy proxy więc to co 
        //odczytujemy jest do bani. 

        console.log(req.ips); //Tablica wszystkich adresów ip. W niektórych przypadkach (szczególnie kiedy to proxy
        //pochodzi z konfiguracji naszego własnego serwera) można odzyskać oryginalne ip. Znajduje się ono w 
        //tablicy req.ips. Zazwyczaj jeden element, ale wiele proxy może oznaczać wiele serwerów. 

        console.log(req.method); //Pokazuje jaką mamy metodę. Po co get na ap.get sprawdzać. Jest specjalna metoda 
        //którą reagujemy na wszystkie zapytania: app.all

        //req.url, req.originalUrl, req.path . Wszystko to są zmienne, które przechowują informacje na temat ścieżki. 
        //req.url wzięte z noda. 
        //req.originalUrl - jest znormalizowany i zawierający ścieżkę pierwotną nawet po przekierowaniach
        //Jeżeli potrzebujemy ścieżki to ekspres zaleca req.originalUrl
        // Nie jest to dokładnie to samo. 
        const {url, originalUrl, path} = req;
        console.log({url, originalUrl, path});

        /*
        req.protocol i req.secure
        Dzięki tym informacjoim możemy sprawdzić czy serwer używa HTTP czy bezpiecznego połączenia https

        Często serwer nasłuchuje jednocześnie na bezpiecznym i zwyczajnym porcie.

        Możemy wykorzystać req.protocol lub req.secure, żeby np. wykryć czy użytkownik odwiedził stronę z adresem http:// i 
        przekierować go na https

        zrobienie httpsa na localhości nie jest łatwe. 
        */
    })


    app.listen('3000'); 
}

//program1();

function program2() {
    const app = express();
    
    const allowedIps = ['localhost', '127.0.0.1', '::1', '::ffff:127:0.0.1'];

    app.get('/', (req) => { 
        console.log(req.ip);
        console.log(req.ips);
        if (allowedIps.includes(req.ip)) {
            console.log('Hello');
        } else {
            console.log("sio");
        }
    })

    app.listen('3000'); 
}

// program2();

/*
##Parametry adresu URL
                                        query str separator
                                            *
http://www/phoneshop.com ? product = iphone & size = 32gb & color=white
    *                    *         *    *
   url           Begin query string* param value
                                parameter name


te pytajniki są fajne, bo nie zmieniają nam ścieżki. Jak zapytamy o ścieżkę to ją dostaniemy bez parametrów. 
A jak poprosimy o req.url?

Jeżeli po com nie damy / to on jest dopisywany automatycznie

Wchodzimy na: 
http://127.0.0.1:3000/ciekawy?name=MegaK&etap=express

##Jak generować na front-endzie parametry adresu url

Po co? Linki do konkretnego użytkownika, paginacja, dynamiczne adresy wyszukiwania, filtrowanie i sortowanie...

Możemy generować poprawnie parametry url na dwa sposoby:
1. Ręczny z użyciem encodeURIComponent -> obecnie oznaczony już jako legacy, czyli prawie trup...
2. Z użyciem obiektu na bazie URLSearchParams

ad 1. Z dziwacznego adresu zrobi nam dobry adres . Jak w konsoli wpiszemy encodeURIComponent('bartek i kuba') to przerobi to dobrze...

ad 2. Tez w przeglądarce wpisujemy 
const qs = new URLSearchParams();
qs.set('name'. 'bartek i kuba');
qs.toString() -> name=Bartek+%26+Kuba%3F

i teraz tak: `jakiśUrl/?${qs.toString()}`

wykorzystanie w node porogram3
Budujemy parametry:
*/

const { URLSearchParams } = require('url');

function program3(){
    const qs = new URLSearchParams({
        name: "Bartek & Kuba?"
    });

    console.log(`http://localhost:3000/?${qs.toString()}`);
}
// program3()

/*
##Odbieramy parametry
*/

function program4() {
    const app = express();

    app.get('/', (req)=>{ 
        console.log(req.query);
    })

    app.listen('3000'); 
}

/*
Ekspres domyślnie źle reaguje na +, można to obsłużyć, 
ale my wygenerujemy teraz tak querry stringa, 
żeby tych plusów w miejscu spacji nie było.
*/

function program5() {
    function generateQueryString(params) {
        const qs = new URLSearchParams(params);
        return `${qs}`.replace(/\+/g, "%20") //znajdź wszystkie + i zamień na "%20"
    }

    console.log(`http://localhost:3000/?${generateQueryString({
        name: 'Bartek & Kuba'
    })}}`);
}
// program5()

/*
##req.get() pobiera nagłówni przesłane przez klienta. 

Przykładowo aby dowiedzieć się skąd przybył wizytator (strona odsyłająca) możemy odczytać nagłówek Referer.

Moglibyśmy np dzięki temu pobrać ciasteczka - nagłówek cookies, ale są prostsze metody

console.log(req.get('cookie));
console.log(req.get('referer));
*/
