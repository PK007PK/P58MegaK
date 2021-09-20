/*
Tworzenie odpowiedzi
MIME type lub Content-type - identyfikator nasze odpowiedzi. Informujemy kllienta, co jest odsyłane.

{"Content-type": 'application/json'}
 ... "text/css"
 ... "text/plain"
 ... "text/html"
 ... "text/html; charset=utf-8"
 ... "text/mp4"
 ... "text/png"
 ... "text/jpeg"
 ...
 bardzo dużo, do wygooglania w razie potrzeby.

 Przeglądarka to najpopularniejszy klient i para do tanga dla serwera http.
 Przeglądarka potrafi przygotować i wysłać żądania do serwera oraz odbierać i obrabiać odpowiedzi.


 Szukanie aadresu IP.
 adres-stronki.com
 - przeglądarka uzupełni o schamat (http).
 - analiza adresu URL i ustalenie jaki adres IP kryje się za daną domeną np.
 138.161.17.22:80 . Przeglądarka robi to za nas i ma wiele sposobów (może np. sprawdzić w serwerach DNS).

 ping megak.pl

 Nawiązanie połączenia (socket);
 - klient inicjalizuje połączenie. Serwer je akceptuje.
 - protokół TCP/IP - ty chcesz, ja chcę, to działamy.
 - tworzone jest gniazdo łączące (socket) - ma adresy, ma określony protokół wymiany danych (http).

Odebranie żądania przez NODE.js
Host i port się zgadzają (z ustawionym na nasłuchiwaniu web serwera) - jeżeli tak, tworzymy obiekty żądania i odpowiedzi
i uruchamiamy funkcję listenera.

Aplikacja serwerowa rusza
W oparciu o mapowanie (routing) przyporządkujemy różne zasoby / logikę do różnych zapytań (najczęściej w zależności od
rodzaju metody w żądaniu (GET, POST, itd) oraz od ścieżki (/article/291))

Żądanie jest przetwarzane zgodnie z logiką biznesową (co ma się dziać). W tym miejscy często serwer kontaktuje się z bazą danych.

Wysyłanie odpowiedzi do klienta
Odpowieź, jak już wiemy, zawiera status, headers oraz body.
Przyjrzyjmy się rzeczy której jeszcze nie omawialiśmy, a mianowicie statusom
kody 1-- kody informacyjne
kody 2-- kody sukcesu: 200ok
kody 3-- kody przekierowania: 301 kod move permanentyly - trwałe przeniesienie zasoby na nowy adres url
kody 4-- kody błędu klienta: 403 kod forbidden - ja wiem że chcesz ale nie masz dostępu. 404 - not found
kody 5-- kody błędu serwera: 500 internal server error
 */