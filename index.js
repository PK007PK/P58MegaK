const { mkdir, rename } = require('fs');
const { mkdir: mkdirprom, rename: renameprom, unlink, rm } = require('fs').promises;
const {writeFile: writeFileProm} = require('fs').promises;
/*
    Tworzenie katalogu, wersja callback
 */

function program1() {
    mkdir('./mega_k', (err => {
        err && console.log(err)
    }));
}
 
//program1()

/*
    Tworzenie katalogu, wersja promisowa
*/

function program2() {
    (async () => {
        try {
            await mkdirprom('./mega_k2');
        } catch(err) {
            console.log(err);
        }
    })()
}

//program2()

/*
    Powyższym sposobem nie stworzymy katalogu w katalogu.
    Aby powstała ścieżka jednym ze sposobów jest dodanie w opcjach recursive: true.
    Domyślnie jest to false. Takie podawanie całej ścieżki może być podatne na tworzenie błędów.
*/

function program3() {
    (async () => {
        try {
            await mkdirprom('./mega_k2', {
                recursive: true, //stworzy za nas całą ścieżkę
            })
        } catch(err) {
            console.log(err)
        }
    })()
}

//program3()

/*
    Zmiana nazwy pliku ale też przenoszenie pliku. W systemach unixowych, 
    ale też w nodzie
    zmiana nazwy jest tym samym co przeniesienie pliku.
*/

function program4() {
    (async () => {
        try {
            await writeFileProm('./hello.txt', 'Hello, World!', 'utf8');
            await renameprom('./hello.txt', './renamedHello.txt')
        } catch(err) {
            if (err.code === 'ENOENT') {
                console.log('Given file name does not exist!')
            } else {console.log(err)}
        }
    })()
}

//program4()

/*
    Przenosimy plik:
*/

function program5() {
    (async ()=>{
        try {
            await writeFileProm('./hello.txt', 'Hello, World!', 'utf8');
            await renameprom('./hello.txt', './data/renamedHello.txt')
        } catch(err) {
            if (err.code === 'ENOENT') {
                console.log('Given file name does not exist!')
            } else {console.log(err)}
        }
    })()
}

//program5()

/*
    Globalna zmienna process
    Znajdują się w niej wszystkie informacje na temat środowiska, 
    noda, etc, konsole, konto użytkownika...
    Jest elementem obiektu global.

    argv - po wcześniejszych językach prog się przyjęło. Argument vector.
    Jest tablicą, zawiera pełną ścieżkę binarną do noda 
    w wykorzystywanej wersji i to samo do pliku który jest wykonywany.

    Jeżeli wpiszemy w konsoli node index.js xyz sss fff, 
    to argv dostanie kolejne elementy tablicy.
    W sytuacji kiedy w nazwie pliku lub katalogu mamy 
    spację argument w linii komend możemy wpisać w nawiasie co rozwiąże problem.

    Od drugiego miejsca w argv znajdują się rzeczy
    które tam przekazaliśmy sami. Możemy coś z nimi zrobić.
 */

function program6() {
    //console.log(process);
    //console.log(global.process);
    console.log(global.process.argv);
    const a = Number(process.argv[2]);
    const b = Number(process.argv[3]);
    console.log(a+b);
}

//program6()

/*
    Program do zmiany nazw plików
*/

function renameProg() {
    (async () => {
        const oldFile = process.argv[2];
        const newFile = process.argv[3];
        try {
            await renameprom(oldFile, newFile)
        } catch(err) {
            if (err.code === 'ENOENT') {
                console.log('Given file name does not exist!')
            } else { 
                console.log(err) 
            }
        }
    })()
}

//renameProg()

/*
    Usuwanie plików, katalogów i ich połączeń. Są do tego różne paczki, 
    ale ostatnio pojawiło się fs.rm().
    Może ona usuwać pliki, katalogi oraz wszystko w środku. Inne to:
    1) fs.unlink()
    2) fs.rmdir()
    1 i 2 działają tak, że musimy zrobić unlink, 
    potem jak już nie ma tam plików to rmdir, potem idziemy katalog wyżej itd, itp.
    Dlatego dobry jest ten nowy fs.rm(). 
    Minusem jest to że rm powstał w wersji 14 noda.
*/

function delProg() {
    (async () => {
        const selectedFile = process.argv[2];
        try {
            await unlink(selectedFile);
        } catch(err) {
            if (err.code === 'ENOENT') {
                console.log('Given file name does not exist!');
            } else {console.log(err)}
        }
    })()
}

/*
rm version
 */

function delProg2() {
    (async()=>{
        const selectedFile = process.argv[2];
        try {
            await rm(selectedFile, {
                recursive: true, //Wchodzi do katalogów i kasuje wszystko co jest w środku
            })
        } catch(err) {
            if (err.code === 'ENOENT') {
                console.log('Given file name does not exist!')
            } else {console.log(err)}
        }
    })()
}

/*
Obserwowanie zmian. Jedną z metod jest fs.watch. Ale to jest bardzo kiepskie. Nie korzystać z tego. Taka informacja zakończyła lekcję.
 */