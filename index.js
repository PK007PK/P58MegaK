/*
Kodowanie/kryptografia - metoda przeobrażania jawnej formy wiadomości w formę ukrytą
w celu uniemożliwiwienia dostęu do przekazywanych
informacji osobom niepowołanym.

Po co kryptografia:
- aby bezpiecznie przesyłać dane;
- wstęp do szyfrowania end to end;
- aby bezpiecznie przechowywać hasła;

Moduł crypto. Działa na podstawie OpenSSl - bardzo znanej biblioteki właśnie pozwalającej min szyfrować.

Nie zawsze jest dostępny. Ale prawdopodobnie go masz.

Cięzko znaleźć jak powinno się odbywać szyfrowanie i deszyfrowanie. Nie ma tego w dokumentacji.
 */

const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const {createCipheriv, createDecipheriv} = require('crypto');

function program1() {

    const algorithm = 'aes-192-cbc'; // ten jest dosyć bezpieczny dla j polskiego, uniwersalny jeżeli chodzi o długość tekstów, ogólnie polecany
    const password = 'Password used to generate key';

    (async () => {
        //First, we'll generate the key. Whe key length is dependent on the algorithm.
        //In this case for aes192, it is 24 bytes (192 bits).
        const key = await scrypt(password, 'salt', 24); // to 24 jest odpowiednie dla aes-192-cbc.
        const iv = await randomBytes(16); //wektor inicjalizujący. dodatkowe hasło. dodatkowa wartośc zawierająca losowe znaki.
        // Kryptograficznie bezpieczny, pseudolosowe znaki.

        const cipher = createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update('Pozdrowienia z mega kursu', 'utf8', 'hex');
        encrypted += cipher.final('hex'); //hex sprawi że nawet dziwne znaki, emotikony etc zmienią się nam w cyfry szesnastkowe
        // bez hexa możemy dostać znaki których windows nie potrafi wyświetlić.

        console.log({
            encrypted,
            iv: iv.toString('hex')
        });
    })();
}

//program1()

function program2() {
    const algorithm = 'aes-192-cbc'; // ten jest dosyć bezpieczny dla j polskiego, uniwersalny jeżeli chodzi o długość tekstów, ogólnie polecany
    const password = 'Password used to generate key';
    const encrypted = 'bdd336874957a011e241d963d145241abe3344f0edb6f4e606c23582863035de';
    const ivHex = '77a2bbfc93e4b2a7dde21b672fbc8682';


    (async () => {
        //First, we'll generate the key. Whe key length is dependent on the algorithm.
        //In this case for aes192, it is 24 bytes (192 bits).
        const key = await scrypt(password, 'salt', 24);
        const iv = Buffer.from(ivHex, 'hex'); //initialization vector;
        const decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted);
    })();
}

//program2()

async function encryptText(text, password, salt) {
    const algorithm = 'aes-192-cbc';
    const key = await scrypt(password, salt, 24);
    const iv = await randomBytes(16);

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encrypted,
        iv: iv.toString('hex'),
    };
}


async function decryptText(text, password, salt, ivHex) {
    const algorithm = 'aes-192-cbc';
    const key = await scrypt(password, salt, 24);
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encryptText,
    decryptText,
}