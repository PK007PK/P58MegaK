const { exec } = require('child_process');

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

Wrsja z promisami:
 */

function program2() {
    (async () => {
        const {stdout, stderr} = await execPromisify('dir');
        console.log({stdout, stderr});
    })()
}


const util = require('util');
const execPromisify = util.promisify(require('child_process').exec);
/*
const util = require('util');
const { exec } = require('child_process');
const execPromisified = promisify(exec);
 */

function program2() {
    (async () => {
        const {stdout, stderr} = await execPromisify('dir');
        console.log({stdout, stderr});
    })()
}
//program2();

function program3() {
    execPromisify('dir')
        .then(data => {
            console.log(data); // Promis może nam zwrócić tylko jedno, dlatego zwraca tu obiekt z domyślnymi właściwościami
        })
}
//program3()

function program4() {
    execPromisify('dir')
        .then(({stdout, stderr})  => {
            console.log(stdout, stderr); // Promis może nam zwrócić tylko jedno, dlatego zwraca tu obiekt z domyślnymi właściwościami
        })
}
//program4()


// Poniższe niebezpieczne bo ktoś może np wpisać: node index.js "1.1.1.1 && format c:"
// Niedopuszczalne jest pozwalanie komuś wstawienia dowolnych rzeczy.
function program5() {
    const ip = process.argv[2];
    (async () => {
        try {
            const {stdout, stderr} = await execPromisify(`ping ${ip}`);
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

//program5()

/*
Bezpieczeństwo parametrów.

Staraj się nigdy nie przekazywać żadnych zmiennych, danych z backendu, tymbardziej danych podanych przez użytkownika!
Jest to jedna z najniebezpieczniejszych rzeczy jakie w ogólne można zrobić programując.

Shell ma dużo potencjalnych możliwości jak wyjść z aktualnej komendy i wykonać dowolną inną!

Patrz poprzedni przykład.

Takich sztuczek jest bardzo dużo i co gorsza są nie do przewidzenia.

Jsk to zrobić bezpiecznie...
- dopuszczać wyłącznie bardzo restrykcyjne formy danych. Opierające się wyłącznie na whiteliście znanych
nam dobrych znaków
- przy nazwach plików używać koniecznie safeResolve

Testujemy opcje:
- env;
- cwd;
- timeout(ping);
- bezpieczny parametr od użytkownika (type plik: safeResolve + bardzo dokładny RegEx)
 */

function program6() {
    // ...node env
    // nie mam siły tego kodowaćć
}

//program6()

/*
Czyszczenie terminala cls

nie jestem w stanie tego dalej notować...
 */

function program7() {
    (async () => {
        try {
            const {stdout} = await execPromisify(`mkdir testowy`);
            console.log(stdout);
        } catch(err) {
            console.error('Oh no', err);
        }
    })()
}

program7()

/*

 */