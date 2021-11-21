/*
Zaawansowany routing
Routing - kierowanie czegoś gdzieś. 
Parametry ścieżek: dowolne dane przesyłane w dowolnym miejscu.

/stala/sciezka/:zmienna
/stala/inna/sciezka/:zmienna1/:zmienna2

Kilka reguł: nazwy jak zmiennych, odzielone od pozostałych elementów ścieżki 
za pomocą /,. lub -
*/
const express = require('express')

function program1() {
    const app = express();

    app.get('/', (req, res)=>{
        res.send('Hi');
    })

    app.listen(3000, () => console.log("http://localhost:3000/"));
}

//program1()


function program2() {
    const app = express();

    app.get('/article/:articleName', (req, res) => {
        res.send('Treść artykułu');
    })

    app.get('/article/new', (req, res) => {
        res.send('Hello new user');
    })

    /*
    Teraz jak wpiszemy: 
    localhost:3000/article/jakikolwieksdfsdf => dostaniemy "treść artykułu"
    localhost:3000/article/new => też dostaniemy "treść artykułu"
    bo idzie z góry do dołu w kolejności zadeklarowania. Jak jest to kolejnego 
    już nie wejdzie. 
    Można odwrócić kolejność aby najbardziej skomplikowane były na górze
    */

    app.listen(3000, () => console.log("http://localhost:3000/"));
}

//program2()

/*
Serwery często robią tak, że tytuł czy inna część urla są zbędne z punktu 
widzenia web serwera. Są tam z uwagi na seo, lub 
ux. Na interii np możemy zmiksować tytuł a i tak wejdzie tam gdzie trzeba. 
Liczy się tylko id.
Poniżej article name jest opcjonalny - pytajnik. 
*/

function program3() {
    const app = express();

    app.get('/article/:id/:articleName?', (req, res) => {
        res.send('Treść artykułu');
    })

    /*
    Serwer zadziała na obydwa adresy:
    ...article/123
    ...article/123/To-jest-tytuł-artykułu/
    */

    app.listen(3000, () => console.log("http://localhost:3000/"));
}

//program3()

/*
Odbieranie parametrów
Wszystkie przesłane parametry są dostępne w obiekcie req.params pod nazwami takimi 
jak ustaliliśmy - ale bez dwukropka

Np:
/article/123/Tytuł
Stworzy obiekt req.params:

{
    id: '123',
    title: "Tytuł",
}
*/

function program4() {
    const app = express();

    app.get('/article/:id/:articleName?', (req, res) => {
        console.log(req.params);
        res.send(`Id: ${req.params.id}, name: ${req.params.articleName}`);
    })

    /*
    Serwer zadziała na obydwa adresy:
    ...article/123
    ...article/123/To-jest-tytuł-artykułu/

    Nazwy parametrów bierze z naszej deklaracji app.get, z tego jak sami kolejno 
    je nazwaliśmy
    */

    app.get('/querryTest/', (req, res) => {
        console.log(req.query);
        res.send(`OK`);
    })
    //http://localhost:3000/querryTest/?a=1&b=2&c=3

    app.listen(3000, () => console.log("http://localhost:3000/"));
}

//program4()

/*
Obiekt response

Koncepcja podobna do tej z obiektem res / response w Node.js - otrzymujemy 
jako drugi parametr w callbacku każdego zdarzenia.
Najczęściej przyjęło się nazywać ten parametr res.
Jest on typu Response bo reprezentuje każdą odpowiedź na zapytanie HTTP.
Sprawdźmy jakie daje możliwości. 
*/

/*
res.write(), res.end()

Pamiętasz korzystanie z res.write() i res.end(), 
aby wyświetlić coś w czystym serwerze HTTP Node?

Sposoby te działają również w Express. Nie jest to część Expressa, 
metody są faktycznie przekierowane bezpośrednio do serwera Node.js,
który znajduje się "pod spodem" Expressu.

app.get('/', (req,res) => {
    res.write('Test!);
    res.end();
})

Warto jednak korzystać z res.send('treść') bo jest szybszy
res.send() robi wiele rzeczy: 
- Ustawia nagłówek Content-Type automatycznie, w zależności co wyślemy. 
- Ustawia nagłówek Content-Length automatycznie;
- Ustawia nagłówki związane z podstawowym cachingiem;
- Konwertuje dane jeżeli to potrzebne;
- Przesyła dane;
- Kończy połączenie;

Dane wejściowe:
res.send(dane_wejściowe)
Możemy przesłać:
- string - text/html i przesyłanie tekstu
- Buffer - application/octet-stream i przesyłanie czystych danych
- array/Object - application/json i zakodowanie danych jako JSON

res.json()
Ponieważ zdecydowana większość API jakie się tworzy otrzymuje i przesyła JSON-a
Express ma wbudowaną metodę pomocniczą do wysyłania JSON-a. 

Jest to res.json()
Działa podobnie jak res.send(), z tym że zawsze wysyła JSONa i ustawia 
Content-Type na application/json

res.json() vs res.send()
Jsona powinno się używać chcąc przesłać jsona, bo:
1) Zawsze otrzymamy jsona, niezależnie od danych wejściowych. Dla res.send() 
przy stringu nie uzyskasz JSON-a!
2) Są dostępne pewne specjalne opcje w Express.js dla res.json 
- m.in. pozwalające ładniej go formatować. 

Przekierowania
Czasami może się zdarzyć, że chcesz przekierować danego klienta na inny adres 
- w Twoim systemie lub zewnętrzny. Można to osiągnąć przesyłając odpowiedni 
kod statusu HTTP oraz odpowiedni nagłówek odpowiedzi Location

Ekspress korzysta w tym celu z res.location() jako parametr podajemy nowy adres. 
*/

function program5() {
    const app = express();

    app.get('/article/:id/articleName?', (req, res) => {
        res.location('https://onet.pl');
        res.end();
    })
/*
Jeszcze dużo dodatkowych ustawień, żeby to zadziałało. Więc może coś szybszego... Tym czymś jest res redirect
*/

    app.listen(3000, () => console.log("http://localhost:3000/"));
}

//program5()

function program6() {
    const app = express();

    app.get('/article/', (req, res) => {
        // res.redirect('https://onet.pl');
        // Możemy też chcieć podać inny status odpowiedzi:
        res.redirect(301, 'https://onet.pl');
        res.end();
    })

    app.listen(3000, () => console.log("http://localhost:3000/"));
}
program6();

/*
Kody:
301- przekierowanie trwałe . Przeglądarka i wyszukiwarka powinny to zapamiętać
302 - przekierowanie niestałe
303 - zobacz gdzie indziej, tak jak 302, ale używane przy metodzie innej niż get, 
jednak mające przekierować na 
metodę get. 
307 - przekierowanie tymczasowe - podobne do 302, ale urzywane przy metodzie
http innej niż get. 

Ścieżki w res.location()
1. Absolutne adresy URL;
2. Wewnętrzne ścieżki
3. Ścieżki względne z użyciem ...
4. "back" odniesienie do nagłóna Referer lub ścieżki głównej /. res.redirect('back)
*/
