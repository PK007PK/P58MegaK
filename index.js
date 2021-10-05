const {createServer} = require('http');

function excercise1() {
    const server = createServer();
    server.on('request', (req, res) => {
        res.writeHead(200, {
            'content-type': 'text/plain',
        })
        // res.end('1');
        /*
        Poniżej ustawimy sobie, żeby ta odpowiedź nie nadchodziła
        natychmiast tylko po 1s
        */
       setTimeout(()=>{
            res.end('1');
       },1000);
    });
    server.listen(3000,'127.0.0.1');
}

//excercise1()


/*
W excercise11  będą dodawały się 2 zamiast 1. To wszystko przez to, 
że program za każdym razem pobiera nam favicona. 
Zlicza nam ilość żądań.
*/

function excercise11() {
    let counter = 1;

    const server = createServer();
    server.on('request', (req, res) => {
        res.writeHead(200, {
            'content-type': 'text/plain',
        })
        res.end(`${counter++}`);
    });
    server.listen(3000,'127.0.0.1');
}

//excercise11()

/*
W excercise12 zrobimy, żeby zliczało wyłącznie / i w ten sposób 
pozbędziemy się zliczania favicona
*/

function excercise12() {
    let counter = 1;

    const server = createServer();
    server.on('request', (req, res) => {

        if(req.url === "/") {

            res.writeHead(200, {
                'content-type': 'text/plain',
            })
            res.end(`${counter++}`);
        }
    });
    server.listen(3000,'127.0.0.1');
}

//excercise12()

/*
W excercise 2 dodamy zapisywanie i odczytywanie stanu licznika z 
pliku:
*/

function excercise2() {
    let counter = 1;

    const server = createServer();
    server.on('request', (req, res) => {

        if(req.url === "/") {

            res.writeHead(200, {
                'content-type': 'text/plain',
            })
            res.end(`${counter++}`);
        }
    });
    server.listen(3000,'127.0.0.1');
}

//excercise2()

/*
W excercise 3 tworzymy dziwaczny api kalkulator
*/

const { calc } = require('./calc');

function excercise3() {
    
    const server = createServer();
    server.on('request', (req, res) => {
        
        console.log(req.url.split('/'));
        const [, operation, a, b] = req.url.split('/');
        const result = calc(operation, Number(a), Number(b));
        
        res.writeHead(200, {
            'content-type': 'text/plain',
        })
        res.end(`${result}`);
        
    });
    server.listen(3000,'127.0.0.1');
}

//excercise3()

/*
Jak profesjonalnie buduje się backend

API - zbiór narzędzi czy danych dostępowych dla innej aplikacji. 
Mówiąc o API w kontekście web servera najczęściej mamy na myśli
web api, które też określamy jako RESTful API (jeżeli spełnia
pewne elementy standardu REST).

Api zrobiliśmy w zadaniu z kalkulatorem.

Endpoint - zdefiniowany URL, który robi różne rzeczy przy żądaniach 
zawierających różne metody. Taki endpoint jest sposobem
na udostępnienie API. Np GET - odczytaj, POST - stwórz, PUT - aktualizuj,
DELETE - usuń. 

Rest jest bardzo proste. Trzeba wiedzieć jakie metody są do czego 
wykorzystywane. Metody są przesyłąne w żadaniu HTTP (dostępne w 
    req.method). 

GET - domyślna w przeglądarce, mówi daj mi;
HEAD - jak metoda GET, ale mówi nie wysyłaj mi body z powrotem
a jedynie headers;
POST - używana do przesyłania danych. W przypadku REST API pod 
przygotowany URL wysyłamy dane (JSON), które np mogą zmieniać
stan aplikacji / dodawać coś do bazy danych. Wykorzystywane w 
formularzu w aplikacji (zawartość formularza przesyłana w żądaniu
jako body i metoda POST);

PUT - jw, ale aktualizuje zasoby/dane (zastępuje obecne, nowo przesłanymi);

DELETE - jw. 

Same meotdy mogą nie być wystarczające. Serwer może wymagać posiadania
dodatnowych uprawnień. 

HTTP i Express
- express jest frameworkiem do tworzenia web serwera / aplikacji serwerowej
(służy więc do tworzenia aplikacji webowych czy RESTful API);

- Serwer HTTP jest niskopoziomowy w porównaniu z serwerem express (
    który jest oparty na module http)

*/