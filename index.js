const { exec } = require('child_process');
const util = require('util');
const execPromisify = util.promisify(require('child_process').exec);
const {normalize} = require('path');

function program1() {
    exec('ping 8.8.8.8', (error, stdout, stderr) => {
        console.log({error, stdout, stderr});
    })
}

//program1()

/*
    Można przerobić na promisa. To najlepsza opcja przy tak prostych operacjach jak tu robiliśmy.

    Jednak pamiętaj, że podobnie jak w obserwowaniu plików, program może zwracać częściowe wyniki w trakcie wykonywania
    kodu. Np ping, GIT, czy narzędzia do CI/CD.

    Z drugiej strony, jeżeli potrzebujemy kontroli nad procesem (np. aby go zatrzymać - pomijając użycie AbortController, tylko
    za pomocą cp.kill() - nie użyjemy wersji z promisami

    Wersja z promisami:
*/

function program2() {
    console.log('Program2 starts');
    (async () => {
        const { stdout, stderr } = await execPromisify('dir');
        console.log({ stdout, stderr });
    })()
}

//program2()

/*
    const { exec } = require('child_process');
    const {promisify} = require('util');
    const execPromisify = promisify(exec);

    lub

    const util = require('util');
    const execPromisify = util.promisify(require('child_process').exec);
 */


function program4() {
    execPromisify('dir')
        .then(data => {
            console.log(data); // Promis może nam zwrócić tylko jedno, dlatego zwraca tu obiekt z domyślnymi właściwościami
        }) 
}
//program4()

function program5() {
    execPromisify('dir')
        .then(({stdout, stderr})  => {
            console.log(stdout, stderr); // Możemy to zdestrukturyzować...
        })
}
//program5()


/*
Poniższe jest niebezpieczne, bo ktoś może np wpisać: node index.js "1.1.1.1 && format c:"
Niedopuszczalne jest pozwalanie komuś wstawienia dowolnych rzeczy.
 */

function program6() {
    const ip = process.argv[2];
    (async () => {
        try {
            const { stdout, stderr } = await execPromisify(`ping ${ip}`);
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program6()

/*
Bezpieczeństwo parametrów.

Staraj się nigdy nie przekazywać żadnych zmiennych, danych z backendu, tymbardziej danych podanych przez użytkownika!
Jest to jedna z najniebezpieczniejszych rzeczy jakie w ogólne można zrobić programując.

Shell ma dużo potencjalnych możliwości jak wyjść z aktualnej komendy i wykonać dowolną inną!

Patrz poprzedni przykład.

Takich sztuczek jest bardzo dużo i co gorsza są nie do przewidzenia.

Jak to zrobić bezpiecznie...
- dopuszczać wyłącznie bardzo restrykcyjne formy danych.
- Opierające się wyłącznie na whiteliście znanych nam dobrych znaków
- przy nazwach plików używać koniecznie safeResolve

Testujemy opcje:
- env;
- cwd;
- timeout(ping);
- bezpieczny parametr od użytkownika (type plik: safeResolve + bardzo dokładny RegEx)
 */

/*
ad env. Uruchamiamy na pomocą node index.js program7 uruchamia test.js podając mu zmienną środowiskową node_env ustawioną na production
 */

function program7() {
    (async () => {
        try {
            const { stdout } = await execPromisify(`node test.js`, {
                // env: {
                //     PATH: 'C:\\testowy' //ustawiliśmy ścieżkę domyślną na c, dlatego też nie może odnaleźć noda, więc się posypał.
                // },
                env: {
                    NODE_ENV: 'development' //ustawiliśmy ścieżkę domyślną na c, dlatego też nie może odnaleźć noda, więc się posypał.
                },

            });
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program7()

/*
ad cwd.
 */

function program8() {
    (async () => {
        try {
            const {stdout} = await execPromisify(`mkdir testowy`, {
                cwd: 'c:\\', // zmieniamy katalog roboczy. Czyli nie stworzy mam "testowy" tutaj, tylko na c:
            });
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program8()

/*
    timeout(ping);
 */

function program9() {
    (async () => {
        try {
            const {stdout} = await execPromisify(`ping 8.8.8.8`, {
                timeout: 1000, // 1s to max czas jaki chcemy oczekiwać na wykonanie exeka. Jeżeli się nie doczeka to err.
            });
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program9()

/*
    Wyrażenia regularne. Tu jest fajna biblioteka regexów: https://regexlib.com/
 */

function program10() {
    const ip = '8.8.8.8asa';
    const safeIp = ip.replace(/[^0-9.]+/g,'');
    console.log(safeIp);
}

//program10()


function program11() {
    const ip = process.argv[2].replace(/[^0-9.]+/g,'');
    (async () => {
        try {
            const { stdout, stderr } = await execPromisify(`ping ${ip}`);
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })() 
}

//program11()

function program12() {
    const program = process.argv[2];
    (async () => {
        try {
            const { stdout, stderr } = await execPromisify(program);
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program12();

function program13() {
    const pathFromUser = normalize(process.argv[2]);

    (async () => {
        await exec('dir', {
            cwd: pathFromUser
        })
        .then(data => {
            console.log(data)
        }).catch(err => {
            if (err.code === 'ENOENT') console.log("No such directory");
        })
    })();
}

//program13();

