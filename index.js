/*
Node.JS Stream.

Buffer nie jest idealny, sam tworzy problemy.
Buffer jest kawałkiem naszej pamięci.
W poprzednich lekcjach szyfrowaliśmy pliki małe.
Jeżeli zechcemy zaszyfrować coś dużego będzie problem.
To co zechcemy zaszyfrować bufferem musi się znajdować w całości w pamięci operacyjnej RAM.
Co jeżeli pracujemy na który waży 50gb? Lub na wielu plikach i tworzymy np ZIP?
Buffer sprawi że będziemy potrzebowali całość załadować do pamięci.

 Czym zatem są te streamy.
 Możemy powiedzieć, że są rozwiniętą koncepcją ponad Buffer.
 Pozwalają one operować na strumieniach danych. Mogą nimi być np:
 - Komunikacja TCP/IP;
 - Pliki bezpośrednio na dysku;
 - Dane przetwarzane np skompresowane czy zaszyfrowane.

 Megaka strumieniują Stream Yard czy jakoś tak.

 Stream odczytuje, zapisuje i lub przekształca dane wszytując ich małą ilość na raz do pamięci - w kawałckach - tzw chunkach

 Typy strimów
 a. Writable. Zapis pliku do streamu.
 b. Readable. Pozwala coś odczytać. Np plik. Np odczyt z urządzenia video.
 c. Duplex. Można z niego zarówno odczytywać jak i zapisywać. Najczęściej komunikacja klient serwer za pomocą tcp-ip.
 d. Transform. Może zmieniać dane które przez niego przechodzą. To np kompresowanie plików.

Praktyczne zstaosowanie i jego modelowanie.
Po to potrzebujemy różnych streamów, aby łączyć je jak klocki lego. Żadko ma sens użycie jednego Streamu.
Trzeba je sobie wyobrazić jako dowolny układ rur z płynem. Np układ paliwowy:
- odczytujemy benzynę z baku,
- przetważamy ją tworząc odpowiednią mieszankę paliwową,
- stworzoną mieszankę przekazujemy do silnika
 */

/*
Kopiowanie pliku za pomocą streamu.
1. Readable stream do odczytu pliku;
2. Writable stream do zapisu pliku;
Uwaga. Sytem plików fs może mieć szybsze sztuczki na kopiowanie. Używaj do tego narzędzi z fs, kiedy tylko możesz.

Algorytm pobierania pliku
1. Readable stream lub duplex stream do odczytu danych z innego serwera;
2. Writable stream do zapisu pliku;

Algorytm kompresowania plików:
1. Readable stream do odczytu pliku;
2. Transform stream do kompresowania danych;
3. WWritable stream do zapisu pliku;

Algorytm szyfrowania:
1. Readable stream do odczytu pliku;
2. Transform stream do szyfrowania pliku;
3. Writable stream do zapisu pliku;

Uwaga. Używamy noda 16+
 */

/*
Tworzenie streamu readable dla plików daje nam użycie
fs.createReadableStream()
Podajemy jako argument nazwę plików, a metoda ta zwraca nam Stream typu readable.

Do streamów nie uzywamy narazie żadnych wersji promisowych.

Poniżej wersja z pipe. Najnowsza i ogólnie super.
 */

const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;

function program1() {
    (async () => {
        const openFileStream = createReadStream('graphic.jpg');
        const writeFileStream = createWriteStream('graphic2.jpg');
        await pipeline(
            openFileStream,
            writeFileStream,
        )
        console.log("Done!");
    })();
}

//program1();

/*
Skracamy program
 */

function program2() {
    (async () => {
        await pipeline(
            createReadStream('graphic.jpg'),
            createWriteStream('graphic2.jpg'),
        )
        console.log("Done!");
    })();
}

//program2();

/*
Powyższe można zrobić na bardzo wiele sposobów.
Wersja w oparciu o starsze rozwiązania:
*/

function program3(){
    const r = createReadStream('graphic.jpg');
    const w = createWriteStream('graphic2.jpg');
    r.pipe(w);
    r.on('end', () => console.log('Ready!')); //Ten callback z uwagi na fakt, że nie ma await.
}

//program3()

/*
Wersja najstarsza. Z ręczną obsługą zdarzeń.
 */

function program4(){
    const r = createReadStream('graphic.jpg');
    const w = createWriteStream('graphic2.jpg');

    r.on('data', data => w.write(data)); // W momencie kiedy udało się odczytać kawałek pamięci (np 10%);
    // czyli data, wtedy uruchom nam funkcję z callbacka. I to się wykonuje wiele razy.
    r.on('end', () => { // na końcu wywoła się zdarzenie end, które odpali kolejną funkcję.
        w.close(); // Tu mówimy funkcji write że już koniec zabawy.
        console.log("Ready!");
    })
}

/*
Jeżeli będziemy pracować ze stremami, to staramy się zaczynać od jak najwyższego poziomu, czyli pipeline.
Najniższy poziom często pojawia się w różnych tutorialach.
 */