/*
Struktura aplikacji express. 
Ex jest unopinionated. Nie upiera się co do tego jak z niego 
korzystamy. 

Wiele początkujących osób woli jednak mieć strukturę. 
Proponowana struktura aplikacji:
 app.js
 package.json
 /public
    -index.html
    -images
    -javascripts
    -stylesheets
        -style.css
/routes
    -index.js
    -users.js
*/

const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const { nameRouter } = require('./routes/name');
function program1() {
    const app = express();
    app.use(express.json());
    app.use('/name',nameRouter);
    app.listen(3000);
}

//program1()
/*
Generator. Istnieje specjalny program lini komend/terminalowy o nazwie
express-generator.
Program ten pomaga stworzyć automatycznie strukturę podobną do tej wyżej. 
Aby go zainstalować należy wykonać komendę
npm i express-generator -g
A aby utworzyć projekt podobny do tego proponowanego
można potem wpisać:
express --no-view --git nazwa_projektu_i_folderu
*/



/*
Serwer na świat vs lokalny
Domyślnie odpalony serwer jest widoczny na świecie. 
Możesz to zmienić. All.listen() ma drugi możliwy argument -
- host. Tak samo jak w module http.

Ustaw hosta na localhost, a Twój serwer nie będzie dostępny z zewnątrz - 
tylko z Twojego systemu/serwera. 

Dzięki temu zwiększasz bezpieczeństwo lokalnie. 
Również wykorzystuje się to w aplikachach, które mają 
działać wyłącznie na danym serwerze. 

app.listen(3000, 'localhost');
lub 
app.listen(3000, "127.0.0.1");
*/

/*
Obciążenie, SSL, prawdziwe połączenie
W praktyce nie stosuje się nigdy samego Node. Obsługa w nim SSL
jest niewydajna - są lepsze rozwiązania. 

Dlatego zazwyczaj stosuje się tzw. reverse-proxy. Wymaga ono już
gotowego serwera produkcyjnego. Tu znajdziesz info na temat konfiguracji.
Sprowadzają się do przekierowania domeny na port:
-apache:
http://www.ionos.com/digitalguide/websites/web-development/nodejs-for-a-website-with-apache-on-ubuntu/#c313777
-nginx:
https://docs.nginx.com/nginx/deployment-guides/load-balance-third-party/node-is/#configuring-basic-load-balancing

rate-limiter
Zawsze warto panować nad tym, ile zapytań jest robionych.
Pamiętaj, że to, że node.js jest bardzo przepustowy to również jego 
przekleństwo. Ktoś może np bardzo szybko skanować Twoją
aplikację w poszukiwaniu dziur lub próbować różnych haseł 
użytkowników. W praktyce można to ograniczyć modułem rate-limiter
express-rate-limit


pm2
To rewelacyjne narzędzie, które:
- zadba o to by Twój proces był zawsze uruchomiony.
- pozwoli Ci pobierać logi aplikacji działających w tle.
- Da Ci dashboard Twoich aplikacji.
- pozwoli Ci skalować bardzo prosto aplikację
https://pm2.keymetrics.io/docs/usage/quick-start/

mp2 start ./index.js
pm2 list - lista podtrzymywanych aplikacji
pm2 monit - dashboard
pm2 logs - logi
pm2 scale index 10 - index 10 razy
pm2 stop all
*/

//rate-limit testujemy

const rateLimit = require("express-rate-limit");

function program2() {
    const app = express();
    app.use(express.json());
    app.use(rateLimit({
        windowsMs: 15 * 60 * 1000, // 15minutes
        max: 100,
    }));
    app.use('/name',nameRouter);
    app.listen(3000);
}