/*
Ścieżki się zazwyczaj buduje. Używamy do tego modułu path (synchronicznie)
oraz kilku wbudowanych zmiennych globalnych.)
 */

const {join,basename, dirname, extname, normalize, resolve} = require('path');

function program1() {
//Ścieżka do katalogu w którym jest nasz entrypoint:
    console.log(__dirname);

//Ścieżka do pliku programu:
    console.log(__filename);

//Sama nazwa uruchamianego pliku lub katalogu. Bez wskazania czy to plik czy katalog:
    myDirPath = './test'
    console.log("basename:", basename(myDirPath));
    console.log("basename:", basename(__filename));

    /*
    Nie powinniśmy budować ścieżek jakoś ręcznie, bo różne systemy różnie je kodują.
    Te powyższe rozwiązania będą dobrze działać na wszystkich systemach.
     */

    const fullPath = join(__dirname, __filename);
    console.log(fullPath);

    /*
    dirname jest odwrotnością basename. Podaje ścieżkę do celu
    __filename i __dirname są zmiennymi globalnymi do tego dochodzą zaimportowane metody.
     */
    console.log("dirname:", dirname(__filename));

    /*

     */
    console.log("__filename", __filename);
// C:\Users\Piotr\Documents\Projects\p58megakex\index.js

    console.log("__dirname", __dirname);
// C:\Users\Piotr\Documents\Projects\p58megakex

    console.log("basename(__dirname)", basename(__dirname));
// p58megakex

    console.log("basename(__filename)", basename(__filename));
// index.js

    console.log("dirname(__dirname)", dirname(__dirname));
// C:\Users\Piotr\Documents\Projects

    console.log("dirname(__filename)", dirname(__filename));
// C:\Users\Piotr\Documents\Projects\p58megakex
}
//program1()

function program2() {
    // Taki program będzie też podawał nieistniejące pliki i katalogi,
    // bo on tylko obrabia to co my mu podaliśmy, bez żadnej weryfikacji
    const userPath = process.argv[2];
    console.log('dirname', dirname(userPath));
    console.log('basename', basename(userPath));
    console.log('extname', extname(userPath));
}

//program2()

function program3() {
    const userPath = normalize(join(__dirname, process.argv[2]));
    console.log(userPath)
}

/*
Bezpieczne budowanie ścieżki bez możliwości wyjścia wstecz, safeJoin to
funkcja napisana przez Kubę. Brak możliwości wyjścia poza katalog aplikacji.
 */

function program4() {
    function safeJoin(base, target) {
        const targetPath = '.' + normalize('/'+target);
        return resolve(base, targetPath);
    }

    const userPath = safeJoin(__dirname, process.argv[2]);
    console.log(userPath)
}

