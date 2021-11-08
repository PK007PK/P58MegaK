/* 
    fs - wbudowany moduł nodowy do pracy na plikach. 
    Odczyt pliku
*/


function program1() {
    fs.readFile('/home/some/file.txt', 'utf8', (err, data) => {
        if (err === null) {
            console.log('Poprawnie odczytano plik.', data);
        } else {
            console.log('Błąd podczas odczytu pliku!', err);
        }
    })
}

/*
    Możemy inaczej odczytać, bez utf8 tylko jakoś zupełnie customowo
*/

function program2() {
    fs.readFile('/home/some/file.txt', (err, data) => {
        if (err === null) {
            console.log('Poprawnie odczytano plik.', data.toString('hex'));
        } else {
            console.log('Błąd podczas odczytu pliku!', err);
        }
    })
}


/* 
    Inny to base64, nieco skrócony, bezpieczny dla internetu(?). 
    w to String też możemy podać utf8 (można też utf-8) 
    będzie tak samo jak na początku w tej wersji skrótowej. 

    Po nazwie pliku można też podać opcje jako obiekt, 
    ale robi się już dużo tekstu więc przechodzimy na promisy. 
*/


function program3() {
    (async () => {
        const data = await readFile('index.js', {
            encoding: 'utf8',
        })
    })()
}

/*
    Zapis pliku
*/

const { writeFile } = require('fs');

function program4() {
    writeFile('./data/hello.txt', 'Hello, World!', 'utf8', (error) => {
        if (error) {console.log('Oh no!', error)} 
        else {
            console.log('File is saved.')
        };
    });
}

/*
    Plik został zapisany, ale też nadpisany. 
    Teraz wersja promisowa:
*/

// const { writeFile } = require('fs').promises;

function program5() {
    (async () => {
        try { 
            await writeFile('./data/hello.txt', 'Hello, World!', 'utf8');
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}

/*
    Można też dodać options:
*/

function program6() {
    (async () => {
        try { 
            await writeFile('./data/hello.txt', 'Hello, World!\n', { // \n będzie robił enter
                flag: 'a', //taka flaga sprawia że nie nadpisuje, tylko dokłada
            });
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}

/*
    Teraz odczytamy liczbę z pliku, 
    a potem ją zapiszemy pomnożoną przez dwa. 
*/

const FILE_NAME = './data/hello.txt';

function program7() {
    (async () => {
        try { 
            const numberFromFile = Number(await readFile(FILE_NAME, 'utf8'));
            await writeFile(FILE_NAME, numberFromFile * 2);
            console.log('File is saved');
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}

/*
    Inna metoda niż writeFile + chcemy dodawać liczbę pomnożoną poniżej tej poprzedniej, 
    plus chcemy to zrobić bez tego obiektu options:
*/

//const { writeFile, readFile, appendFile } = require('fs').promises;

function program8() {
    const FILE_NAME = './data/hello.txt';

    (async () => {
        try { 
            const numberFromFile = Number(await readFile(FILE_NAME, 'utf8'));
            const arr = [...numberFromFile.split('\n')];
            await appendFile(FILE_NAME, `\n${arr[arr.length-1]*2}`, 'utf8');
            console.log('File is saved');
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}

/*
    A teraz na callbackach / dużo i straszny kod bo dużo
*/

//const { writeFile, readFile, appendFile } = require('fs').promises;

function program9() {
    const FILE_NAME = './data/hello.txt';

    readFile(FILE_NAME, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const numberFromFile = Number(data);
            appendFile(FILE_NAME, `\n${numberFromFile * 2}`, 'utf8', error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('File is saved');
                }
            })
            
        }
    }
}

/*
    Lista plików i folderów w folderze
*/

const { readdir } = require('fs').promises;

function program10() {
    async function readFilesAndDirectories() {
        const list = await readdir('.');
        console.log(list);
    }
    readFilesAndDirectories();
}

/*
    Kalalogi ukryte wyświetlą się z . na początku
    Żeby nie pokazywać ukrytych dajemy tak: 


const list = await readdir('.', {
	???
});

A gdybyśmy pobierali na początku tak:
const fs = require('fs');

const files = await fs.promises.readdir(-ścieżka-);
```
*/

const { readFile, readdir, stat } = require('fs').promises;

const { readFile, readdir, stat } = require('fs').promises;

function program12() {
    async function readFilesAndDirectories() {
        const fileNames = await readdir('./data', {
            withFileTypes: true,
        });

        for (const {name: fileName} of fileNames) {
            const fileContent = await readFile(`./data/${fileName}`, 'utf8');
            console.log(fileContent);
            const fileStat = await stat(`./data/${fileName}`);
            console.log(fileStat.isFile());
        }
    }

    readFilesAndDirectories();
}

//program12()

/*
    Nie jest nigdy zalecane sprawdzanie istnienia pliku przed 
    odczytem, zapisem
*/

const { exists } = require('fs').promises;

//Exist jest depreciated, nie należy go używać!!!!!!!!

const FILE_NAME = './data/hello-world.txt';

function program13() {
    (async () => {
        const fileExist = await exist(FILE_NAME);
        if (!fileExists) {
            console.log('This is not a valid file!');
        }
    })()
}

/*
    Lepsza opcja
*/

const {access} = require('fs').promises;
const {W_OK, R_OK} = require('fs').constants;

function program14() {
    const FILE_NAME = './data/hello-world.txt';
    (async () => {
        try {
            () => {
                await access(FILE_NAME, W_OK); 
                //Sprawdzam, czy mam taki dostęp aby plik 
                //zapisać
            }
        } catch(err) {
            console.log('File is not valid');
        }
    })()
}

/*
    Powyższe jest metodą asynchroniczną. Nie jest to zalecane i polecane, bo 
    zanim się wykona to już mogą nastąpić zmiany

    Najlepsza opcja sprawdzenia, czy plik istnieje. 
    Staramy się odczytać, a jeżeli określony błąd się pojawi 
    to znaczy że nie istnieje i trzeba to obsłużyć. 
*/


const { readFile } = require('fs').promises;

function program15() {

const FILE_NAME = './data/hello-world.txt';

    (async () => {
        try {
            const result = await readFile(FILE_NAME, 'utf8');
        } catch(err) {
            if (error.code === 'ENOENT') {
                console.log('File is not valid')
            } else {
                console.log('Unknkown error')
            }
        }
    })()
}

/*
    błąd ENOENT dla odczytu lub EEXIST dla zapisu
*/