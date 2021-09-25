//const {readFile} = require('fs').promises;  /// ,- tutaj pobieramy wersję promisową
const {readFile} = require('fs')
const {readFile: readFilePromis} = require('fs/promises');
const {lookup: lookupPromise} = require('dns').promises;
const {lookup} = require('dns');
const dns = require('dns');
const {promisify} = require('util'); // pozwala korzystać ze składni promisowej
const dnsPromises = require('dns').promises;

function program1() {
    console.log('Hello, World!');
    (async () => {
        try {
            const data = await readFilePromis('./index.js', 'utf8');
            console.log(data);
        } catch (err) {
            console.log(err)
        }
    })()
    console.log('Program has finished!');
}
//program1()

/*
    Programnr2 jest dowodem na asynchroniczność readFile. Read file i lookup są w tym
    przypadku asynchroniczne, oparte na callbackach, efekty ich działania zobaczymy 
    na końcu.

    Callback jest skonstruowany tak, że podajemy w nim funkcję która zostanie uruchomiona 
    kiedy już coś się stanie.

    W takim programowaniu błęd nie pojawi nam się tylko dlatego że jest. 
    Musimy sami zadbać o to, aby mieć info że jest błąd.
*/

function program2() {
    console.log("Start");
    //Poniższe odpali się na końcu . To tak jak byśmy powiedzieli: 
    //wyświetl się jeżeli będzie już gotowe.
    // readFile('./index.js', 'utf8', (err, data) => {
    //     if (data) {console.log(data)}
    //     if (err) {console.log(err)}
    // })
    const options = {
        family: 6,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };
    lookup('www.google.com', options, (err, addresses) => {
        if (addresses) {console.log('addresses: %j', addresses)}
        if (err) {console.log(err)}
    })
    console.log("End");
}
//program2()
 

/*
    Ulepszymy obsługę błędów przy callbackach w stylu nodowym
*/


function program3() {
    console.log("Start");
    readFile('./index.js', 'utf8', (err, data) => {
       if (err === null) {
           console.log("ok data", data);
       } else {
           console.log("Ops... problem");
       }
    })
    const options = {
        family: 6,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };
    lookup('www.google.com', options, (err, addresses) => {
        if (err === null) {
            console.log("ok adress", addresses);
        } else {
            console.log("Ops... problem");
        }
    })
    console.log("End");
}
//program3()

/*
Teraz przejdziemy z callbacków na promisy. Promisy trzeba inaczej zaimportować
const {readFile} = require('fs').promises;
const {readFile} = require('fs/promises');

To przerabia moduły w stylu callbackowym na moduły w stylu promisowym
const {promisify} = require('util');

 */

function program4() {
    console.log('Hello, World!');

    const readFilePromised = promisify(readFile);
    readFilePromised('./index.js', 'utf8')
        .then(data => {
            // console.log(data);
        })
        .catch(error => {
            console.log('Oh no', error);
        })
    console.log('Program has finished!');

    const lookupPromisified = promisify(lookup);
    const options = {
        family: 6,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };
    lookupPromisified('www.google.com', options)
        .then(addresses=>console.log(addresses))
        .catch(err=>console.log(err));
}
//program4();

/*
    Przerabiamy callback na promisa i Korzystamy z async await
 */

function program5() {
    console.log('Hello, World!');
    (async ()=>{
        try {
            const data = await promisify(readFile)('./index.js', 'utf8');
            console.log(data);
        } catch(err) {
            console.log(err)
        }
    })()
    console.log('Program has finished!');
}
//program5()

/*
    Ulepszenie polegające na pracy od razu z zaimportowaną wersją promisową
 */
function program6(){
    console.log('Hello, World!');
    (async ()=>{
        try {
            const data = await readFilePromis('./index.js', 'utf8');
            console.log(data);
        } catch(err) {
            console.log(err)
        }
    })()
    console.log('Program has finished!');
}
//program6()


//Zadanie

// Wersja Callback
function zadanieCallback() {
    lookup('google.com', ((error, address) => {
        if (!error) {
            console.log('Address IP google.com: ', address);
        } else {
            console.log("Something went wrong!", error);
        }
    }));
}

// Wersja z Promises
function zadaniePromises() {
    promisify(lookup)('yahoo.com')
        .then(data => {
            console.log(data.address)
        })
        .catch(error => {
            console.log('Something went wrong!', error)
        });
} 
//zadaniePromises()

function abc() {
     promisify(readFile)('yahoo.com')
          .then(data => { 
              console.log(data.address)
         })
         .catch(error => {
              console.log('Something went wrong!', error)
         });
}

abc();

// Wersja z async/await + Promises
function zadanieAsync() {
    (async () => {
        try {
            const data = await dnsPromises.lookup('google.com');
            console.log('Address IP wp.pl: ', data.address);
        } catch (error) {
            console.log('Something went wrong!', error)
        }
    })();
}