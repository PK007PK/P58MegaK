/*
Żądane http i działanie serwera

Zadamoe http zawiera:
- nazwę metody. Domyślnie wysyła get;
- ścieżkę URL (bez portu i hosta);
- wersję protokołu;

get / http / 1.1
post /user/name/99heniek http/1.1

Co zawiera żądanie http - headers i body
Nagłóki (headers), to para klucz - wartość np
{host: 'localhost:2000'}

Żądanie może zawierać także body, w którym często przekazywane są dane w JSON (np. gdy wysyłamy dane z
formularza za pomocą metody POST).

Callback przy każdym żądaniu
Emitowanie żądania "request" na naszym serwerze wywołuje callback (czyli listener) określony w funkcji createServer.
Ile żądań, tyle razy jest wywoływana funkcja zwrotna (dla każdego żądania tworzony jest własny obiekt req i res).

http.createServer(()=> {
    /kod/
})

Kiedu uruchomimy nasz kod
- serwer oczekuje...
- jest żądanie na nasz port! Zostało emitowane zdarzenie "request"
- działam! Uruchomić callback!

Zdarzenie "request" -> uruchomić callback!
Stworzyć dwa obiekty (dostarczane przez moduł HTTP).
- instancję klasy IncomingMessage
- instancję klasy ServerResponse
i przekazać je do wywołanej funkcji.

Obiekt żądania w Node.js
Tworzony jako instancja klasy IncomingRequest i przekazywany jako pierwszy argument.
 */
const http = require('http');
function program1() {

    http.createServer((req, res) => {
        /*
        req.url - ścieżka url (sama domena to '/')
        req.method - domyślnie GET
        req.headers - obiekt składający się z par nazwa - wartość
        {host: "localhost:3000", connection: "keep-alive}
         */
    })
}

function program2() {
    const server = http.createServer();
    server.on('request', (req, res) => {
        console.log(req.url); // Tu sobie czytamy urle jakie user wpisuje

        if (req.url === "/") {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Tuuutaj zrobione żeby <h1> się obsłużyło w odróżnieniu od 'text/plain'
            res.end('<h1>Hello from MegaK</h1>');
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'}); // Tuuutaj zrobione żeby <h1> się obsłużyło w odróżnieniu od 'text/plain'
            res.end('<h1>Not found</h1>');
        }

    })
    server.listen(3000, 'localhost');
}

//program2()

function program3() {
    const server = http.createServer();
    server.on('request', (req, res) => {
        if (req.url === "/" && req.method === 'GET') { // możemy dodatkowo określić metodę
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Hello from MegaK</h1>');
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Not found</h1>');
        }

    })
    server.listen(3000, 'localhost');
}

//program3()


function program4() {
    const server = http.createServer();
    server.on('request', (req, res) => {
        console.log(req.headers.cookie);
        console.log(req.headers["cache-control"]); // bo spacja w nazwie
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Hello from MegaK</h1>');
    })
    server.listen(3000, 'localhost');
}

//program4()

/*
Odpowiedź serwera
Podobna w strukturze jak zapytanie do niego.
- protokół
- nagłówki
- odpowiedź właściwa to co dawaliśmy powyżej do res

Serwer generuje obiekt odpowiedzi i przekazuje go do funkcji zwrotnej jako drugi argument.
Wewnątrz funkcji możemy obiekt odpowiedzi edytować i zakończyć (wysłać do klienta).
Obiekt odpowiedzi powstaje jako instancja klasy ServerResponse z modułu http. Pamiętaj, że wewnątrz powinniśmy tworzyć logikę
asynchroniczną by nie blokować serwera.

To właśnie klucz do wydajmych serwerów node.

http.createServer((req, res) => {
    ...
})

 */

function program5() {
    const server = http.createServer();
    server.on('request', async (req, res) => {  // WOW, CALLBACK MOŻE BY ASYNCHRONICZNY!!!! Nie musimy dawać (()=>{})()
        console.log(req.headers.cookie);
        console.log(req.headers["cache-control"]); // bo spacja w nazwie
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Hello from MegaK</h1>');
    })
    server.listen(3000, 'localhost');
}

//program5()

/*
Obiekt odpowiedzi zawartość
http.createServer((req, res) => {
    1) res.writeHead() - definiuje status odpowiedzi serwera oraz nagłówki odpowiedzi (headers) w formie obiektu Np
    writeHead(200, { "content-type": "aplication/json" })
    2) res.statusCode - kod odpowiedzi możemy zdefiniować także poprzez przypisanie go do właśniwości statusCode;
    3) res.write(zawartość) - wewnątrz metody definiujemy zawartość, która ma być w odpowiedzi wysłanej do klienta.
    Można zrobic dowolną ilość razy.
    4) res.end() - informacja do serwera "możesz wysyłać!" (bez tego nie wyśle odpowiedzi) - odpowiedź jest zakończona.
    Dodatkowo w metodzie end() można umieścić content, który ma być wysłany (czyli może pełnić też rolę res.write())
})
 */

const { readFile } = require('fs').promises;

function program5() {
    const server = http.createServer(); //To robi -> nasłuchujemy...
    server.on('request', async (req, res) => {
        const html = await readFile('./index.html', 'utf8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    })
    server.listen(3000, 'localhost');
}

program5()