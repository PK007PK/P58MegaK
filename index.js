/*
Event emitter

Struktura lub technika (a dokładnie klasa, która wymusza sposób pisania kodu)
specyficzna dla noda.

Programowanie za pomocą zdarzeń oznacza w praktyce, że:
1. Z jednej strony eliminujemy informację o zdarzeniu - po prostu puszczamy w świat info
że coś się stało;
2. Z drugiej strony możemy na takie zdarzenie zareagować i coś zrobić, gdy się o tym dowiemy
(obsłużyć zdarzenie).

Bardzo popularne w programowaniu JS jest po prostu używanie zdarzeń. Odnośnie node mówi się często,
że jest to programowanie oparte o zdarzenia. Stworzono w node coś co ma nam znacznie pomóc
korzystać z tej techniki i jest wbudowane w node.js

Nazywa się właśnie EventEmitter.

Napiszmy prosty program wyświetlający co sekundę "Hi"
 */

function program1() {
    setInterval(() => {
        console.log("hi");
    }, 1000);
}

//program1()

/*
Teraz przenieśmy ten kod do innego pliku, zakładamy, że jest to osobny moduł

Nadal chcemy obsłużyć to co się dzieje co sekundę - czyli wyświetlać console.log - w głównym pliku naszego programu

Robimy to za pomocą zdarzenia.
 */

const { tickTock } = require('./tick-tock')

function program2() {
    const events = tickTock();
}

//program2()

/*
W naszym nowym module emitujemy zdarzenie. A więc wykonujemy na obiekcie typu EventEmitter metodę
.emmit('nazwaZdarzenia'). Nikt nam go nie narzuca. Naszym zdarzeniem będzie info że minęła sekunda.
Program co minutę informuje, że zdarzenie miało miejsce, że upłynęła sekunda, tylko nikt tego nie nasłuchuje...
 */

const { tickTock2 } = require('./tick-tock')

function program3() {
    const events = tickTock2(); // events tutaj to to samo co zwracane w tick-tocku ee
}

//program3()

/*
Teraz w głównym pliku naszego programu możemy nasłuchjiwać.
Robimy to za pomocą metody na tym samym obiekcie typu
EventEmitter która wygląda jak poniżej/

obiektEventEmitter.on('nazwaZdarzenia', () => {

})

emit - informujemy o zdarzeniu
on - reagujemy na zdarzenie

 */


function program4() {
    const events = tickTock2();
    events.on('secondElapsed', () => {
        console.log("hi");
    });
}

//program4()

/*
Przekazanie danych

Podobnie jak w przypadku callbacka, czy promisa, możemy w evencie przekazać jakieś dane.
Po prostu dodajemy je jako kolejne argumenty wywołując emit().

Odbieramy je jako parametry w callbacku w .on()

Liczy się kolejność, nie nazwa parametrów.

Dodajemy teraz tickTock3 i dajemy tam dodatkowy argument test
 */

const { tickTock3 } = require('./tick-tock')

function program5() {
    const events = tickTock3();
    events.on('secondElapsed', data => {
        console.log("hi", data);
    });
}

//program5()

/*
once zamiast on - wykona się tylko raz.
 */

function program6() {
    const events = tickTock3();
    events.once('secondElapsed', data => {
        console.log("hi", data);
    });
}

//program6()

/*
Wiele listenerów
To co daje nam ta technika to to, że możemy w dowolnym miejscu naszego prtogramu (o ile mamy dostęp do
tego samego obiektu EventListener) nasłuchiwać na dowolne zdarzenia tyle razy, ile chcemy.
Dodajmy jeszcze kilka nasłuchiwań zdarzeń
*/

function program7() {
    const events = tickTock3();
    events.on('secondElapsed', data => {
        console.log("hi", data);
    });
    events.on('secondElapsed', data => {
        console.log("Tick!", data);
    });
}

//program7()

const { tickTock4 } = require('./tick-tock')

function program8() {
    const events = tickTock4();
    events.on('secondElapsed', () => {
        console.log("1 second");
    });
    events.on('fiveSecondsElapsed', () => {
        console.log("5 seconds");
    });
}

//program8()

function program9() {
    const events = tickTock4();
    events
        .on('secondElapsed', () => {
            console.log("1 second");
        })
        .on('fiveSecondsElapsed', () => {
            console.log("5 seconds");
        });
}

//program9()

/*
Obiektowo
Tworząc piękną klasę stajemy się bardziej OOP. Możemy wskazać tam, że rozszerzamy klasę EventEmitter za pomocą
słowa kluczowego extends.

Przez to tworząc nowy obiekt na bazie naszej klasy jest on w uproszczeniu defacto również obiektem typu EventEmitter.
To bardzo wygodne.

Zwróć uwagę jak zmienia to sposób, w jaki emitujemy i w jaki obsługujemy zdarzenia.

klasa rozszerzona inną klasą oznacza że mamy dostęp do metod i właściwości klasy, z której dziedziczymy
 */

const { TickTock5 } = require('./tick-tock')

function program10() {
    new TickTock5()
        .on('secondElapsed', (data) => {
            console.log(data);
        })
        .on('fiveSecondsElapsed', (data) => {
            console.log(data);
        });
}

//program10()

/*
Asynchroniczność.
Wiele osób myśli, że ponieważ używamy zdarzeń, to są one asynchroniczne.
Nic bardziej mylnego. Domyślnie Event emitter wywołuje synchronicznie wszystkie metody nasłuchujące
danego zdarzenia po kolei, w kolejności w jaki zostały dodane
 */