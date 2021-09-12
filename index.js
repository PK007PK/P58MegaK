/*
Kompresja pliku.
- readable stream do odczytu pliku;
- transform stream do kompresji pliku;
- writable stream do zapisu pliku;

Moduł zlib.
Pozwala na kompresję i dekompresję za pomocą kilku wbudowanych algorytmów. Najpopularniejszym, który
wykorzystamy jest Gzip. On nie tworzy jednak plików .zip ani .gzip.
Kompresja za pomocą modułu takiego jak zlib zazwyczaj nie tworzy nam tzw. archiwum - a więc pliku,
zawierającego wiele skompresowanych plików i metadanych.

Kompresja / dekompresja oznacza zmniejszanie rozmiaru pojedynczych danych, np. jednego pliku.
Potem umożliwia w naszym programie przywrócenie pierwotnego rozmiaru.

Jak skompresować plik? W uproszczeniu do wyboru mamy metody takie jak:
zlib.gzip(buffer) dla Bufferów;
zlib.createGZIP() dla Streamów;

Różnica pomiędzy Buffer i Stream:
1. Buffer używa się po prostu prościej. Od razu podajemy Buffer wejściowy i otrzymujemy skompresowany.
2. Niestety buffer zajmuje tyle pamięci ile ważą dane. Zatem wersja streamowa może przetwarzać znacznie większe
dane.
 */

const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const {createGzip, createGunzip} = require('zlib');

function program1() {
    (async () => {
        await pipeline(
            createReadStream('graphic.jpg'),
            createGzip(),
            createWriteStream('graphic2.jpg'),
        )
        console.log("Done!");
    })();
}

//program1();

/*
Jak dekompresować plik?
zlib.gunzip(buffer) dla Bufferów;
lub
zlib.createGunzip() dla Streamów;
 */

function program2() {
    (async () => {
        await pipeline(
            createReadStream('graphic2.jpg'),
            createGunzip(),
            createWriteStream('graphic3.jpg'),
        )
        console.log("Done!");
    })();
}

program2();


/*
Max ilość ramu do wykorzystania w node: ok 2giga.
 */