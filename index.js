/*
http
Wprowadzenie do tego co node robi najlepiej czyli webserwerów.
Dzisiejsza lekcja jest bardzo niskopoziomowa. Fundament tego na czym pracuje ekspres.
Jest to wprowadzenie do komunikacji sieciowej.

Web server (HTTP server)
Web server to aplikacja (program), która nasłuchuje rządania od klienta, przetwarza je i wysyła odpowiedź.
Web serwer działa (najczęściej) w oparciu o protokół HTTP, który określa reguły komunikacji między klientem
(najczęściej przeglądarka) a serwerem. Polskim określeniem na webserwer jest serwer WWW, web serwer lub serwer webowy.

Mówiąc serwer można mieć na myśli wiele rzeczy. Często mówimy po prostu serwer zamiast web server czy serwer http -
wszystko zależy od kontektu. Bardzo często mówiąc serwer mamy na myśli fizyczne urządzenie, podłączone do sieci (internetu),
które świadczy (jakieś) usługi np. udostępnia zasoby.

Z definicją serwera jest podobnie jak z definicją API. Wszystko zależy od kontekstu.
My będziemy mówili o serwerze jako o programie, do którego łączy się klient (np przeglądarka).

Co robi web server:
1. Nasłuchuje żadań (request) od klienta (najczęściej przeglądarka);
2. Gdy żądanie wystąpi, przetwarza je. Całą logikę określamy aplikacją serwerową.
3. Wysyła do klienta odpowiedź (response)

Co robi WS? Przede wszystkim czeka w gotowości na zdarzenie.

Klient. Klientem jest nazywany dowolny program, który łączy się z serwerem. Najpopularniejszym klientem jest przeglądarka.
Ale może być nim także np aplikacja mobilna, a nawet Twój serwer - np gdy odpytuje zewnętrzne api o pogodę.

TCP/IP - Transmission Control Protocol. Definiuje sposób w jaki komunikuje się klient z serwerem.
UDP - inny podobny.

Adres IP. Każdy klient i każdy serwer ma swój adres IP, który pozwala się odnieść i ustanowić połączenie.

Socket - gniazdo które łączy klienta z serwerem. Możemy sobie je wyobrazić jako połączenie (linię) łączącą po której przesyłane są dane.
Otwiera się i zamyka. To bardzo ważna definicja która przyda się kiedyś w zaawansowanych zastosowaniach.

Pakiety - sposób przesyłania danych. Dane dzielone są na fragmenty i w taki sposób przesyłane między klientem a serwerem (pakiety).

http - HyperText Transfer Protocol.
Istnieją też protokoły z których korzysta TCP/IP. Najpopularniejszym jest HTTP (inne popularne to FTP czy SMTP).

http to zbiór regół dla przesyłania danych i ich formatu. Danych przypomnijmy transferowanych za pomocą protokołu
TCP/IP. Protokół HTTP obejmuje min budowę (zawartość) żądania (request) i odpowiedzi (response).

Protokół http powstał w 1991 roku. Jest wykorzystywany zarówno w świecie stron oraz przy udostępnianiu api (udostępnianiu
danych i narzędzi). Web serwer (API) jest wykorzystywany przez aplikacje mobilne czy różnego rodzaju urządzenia (IoT).

API. To szerokie pojęcie. W przypadku serwerów często możemy mówić o tym, że API jest po prostu sposobem, w jaki klient porozumiewa się
z serwerm.

Rest / Restful API. Można również wykorzystać specjalną architekturę pisania serwerów korzystających chociażby z HTTP.
Jest nim np REST.

Wróćmy do niego później. Jednak już teraz możesz wiedzieć, że jest po prostu dokładniejszym określeniem tego co i kiedy przesłać.

Czyli wszystko powyższe służy do tego żeby wszystko ze wszystkim rozmawiało. Jak o tym wszystkim myśłeć?
Lubimy to porównywać do komunikacji międzyludzkiej. Moglibyśmy powiedzieć, że:
- TCP/IP jest jak określenie, że porozumiewamy się dźwiękami;
- http jest określeniem, że mówimy do siebie w j. polskim;
- REST jest określeniem slangu i skrutów, jakimi się posługujemy;
- API jest zbiorem określonych słów, jakich używamy w komunikacji.

Zauważ, że każdy kolejny element jest poprostu uściśleniem, ułatwiającym komunikację między dwoma osobami znającymi dane
pojęcia.

https://megak.pl:443/path/to/resource
http/https/ftp - wskazujemy protokół, tą część url, określamy też scheme(schemat). https, to protokół http w wersji szyfrowanej;
megak.pl - host (domena lub adres IP);
443 - port, jest ich mniej więcej od 1 65 tyś
/path/to/resource - ścieżka (url)

Całe powyższe wyrażenie stanowi adres url. PS. URL to rodzaj URI. URI to dowolny identyfikator, np ISBN jest URI.

Port (numer). Połączenie wymaga nie tylkoi adresów IP, ale także numeru portu na którym web serwer nasłuchuje zapytania.
Na serwerze (dostępnym pod adresem IP) może działać bowiem wiele programów nasłuchujących żądania, m.in nasz Web serwer.
Po to jest właśnie port, by prawidłowo rozdzielić żądanie.

Kiedy przechodzisz przez jakieś zapytanie do serwera (platforma Node.js), to sprawdzane jest czy nasz Web serwer obsługuje
dany port (wskazujemy jaki port obsługujemy). Jeśli tak, to otrzymuje on (nasz web serwer), to żądanie.

sam https://megak.pl nie wystarczy bo w tym bloku może mieszkać 65000 osób i nasłuchiwać... Musimy znać też numer portu.

Oczywiście, wpisując adres url w przeglądarkę użytkownik bardzo rzadko wpisuje port. Dzieje się tak ponieważ istnieją domyślne porty,
które będą użyte, o ile nie zostaną przypisane inne.

https://nazwastrony.com:443 - oznacza to samo co https://nazwastrony.com - domyślny port dla https
http://nazwastrony.com:80 - oznacza to samo co http://nazwastrony.com - domyślny port dla http

Aplikacja serwerowa a web serwer. W node.js nasz web serwer i aplikacja serwerowa to w zasadzie to samo.
Node.js używamy do tworzenia aplikacji serwerowych, których częścią jest serwer HTTP. Wynikiem działania aplikacji serwerowej najczęściej będzie strona www,
aplikacja webowa (sieciowa), czy udostęnione API (RESTfull Api).

Odbieramy żądanie (serwer http)
Przetwarzamy żądanie - logika, baza danych (aplikacja serwerowa)
Zwracamy odpowiedź (serwer http)
 */


/*
Modłu http (modłu podstawowy)
Kompletne, wydajne rozwiązanie, które pozwala tworzyć w Node.js serwer http.
By korzystać z modułu http musimy go umieścić w aplikacji za pomocą require.

const http = require('http');
Inne, bardziej zaawansowane frameworki jak np Express, NestJs i tak zazwyczaj pod spodem korzystają włąśnie z tego modułu.
 */

const http = require('http');
// Na froncie powinniśmy pobierać tylko to co konieczne. Na backendzie nie ma to znaczenia.
const {createServer} = require('http');
//http.createServer(); //Korzystamy z metody createServer, która tworzy dla nas instancję obiektu HTTP Server.
//const server = createServer();
//createServer().listen(); //na stworzonym serwerze ustawiamy nasłuchiwanie
//lub
//server.listen();

function program1() {
    /*
    Podamy tu port i host, na których nasłuchujemy

    127.0.0.1 to interfejs nasłuchujący. To co tu wpiszemy oznacza gdzie nasz serwer został uruchomiony.
    to jest zawsze nasz adres ip, chodzi o maszynę na której uruchamiamy dany kod. kocalhost.  Nikt z zewnątrz nie
    może na to wejść.

    Jeżeli chcemy, żeby mogli wejść podajemy 0.0.0.0 - wtedy przyjmuje połączenia z zewnątrz.

    Dlaczego 3000. Portu 80 nie używamy, bo często jest zablokowany na kompie lokalnym, a nawet w prawdziwym serwerze.
    Portu 443 nie używamy, bo nie umiemy jeszcze robić https.

    3000 jest przyjętą konwencją nodową. tak jak 8080 w php.
     */
    http.createServer().listen(3000, '127.0.0.1');
}

//program1()

function program2() {
    /*
    createServer może przyjąć funkcję, tzw Request listener. Ten callback będzie wywoływany, kiedy pojawi się żądanie z zewnątrz.
    Jak teraz w przeglądarce wejdziemy na localhost:3000 . Obecnie to się zawieci, bo nasz serwer jeszcze nie potrafi zakończyć
    połączenia. W node wyświetli się hi. W przeglądarce niestety jeszcze nie.
     */
    http.createServer(()=>{
        console.log("Hi");
    }).listen(3000, '127.0.0.1');
}

//program2()

function program3() {
    /*
    w callbacku mamy zwyczajowo dwa argumenmty: request (incoming message) i response (server response). Są to obiekty
    z określonymi właściwościami. Wewnątrz funkcji możemy korzystać z obu. W przykładzie dopisaliśmy nagłówek
    w postaci kodu statusu odpowiedzi (200 - ok) oraz typu zawartości odpowiedzi (html)
     */
    http.createServer((request, response)=>{
        response.writeHead(200, {'Content-Type': 'text/html'}); // Poniższe się wyświetli jako html, bo tutaj napisaliśmy, że może tak zrobić
        //ale domyślnie pewnie też tak zrobi.
        response.end('<h1>Witaj na stronie stworzonej w node!</h1>');
    }).listen(3000, '127.0.0.1');
}

//program3()

function program4() {
    /*
    Tutaj to samo, tylko trochę inaczej:
     */
    const server = http.createServer();
    server.addListener('request', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Dzień dobry')
    })
    server.listen(4400, '127.0.0.1');
}

//program4()

function program5() {
    /*
    Jeszcze inaczej
     */
    const server = http.createServer();
    server.on('request', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Dzień dobry')
    })
    server.listen(3000, 'localhost'); // można też podać localhost
}

program5()