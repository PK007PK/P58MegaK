/*
Zadanie
Do zadania używamy streamowej wersji szyfrowania i deszyfrowania, która jest mniej bezpieczna, bo nie
zawiera iv. Robimy to tylko w celu przećwiczenia streamów. Metody do wykorzystania to:
- crypto.createCipher(algorithm, password)
- crypto.createDecipher(algorithm, password)
Obydwie zwracają obiekt Cipher, który również jest Streamem typu transform
 */

const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const {createCipher} = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { ENCRYPTION_SALT } = require('./constants');


(async () => {
    const [,,inputFile, outputFile, pwd] = process.argv;

    const algorithm = 'aes-192-cbc';
    const key = await scrypt(pwd, ENCRYPTION_SALT, 24);

    await pipeline(
        createReadStream(inputFile),
        createCipher(algorithm, key),
        createWriteStream(outputFile),
    )
    console.log("Done!");
})();

/*
Przy korzystaniu pojawia się ważne ostrzeżenie. Oznacza, że crypto.createCipher() jest wycofane.
To dlatego, że nie ma tam iv, co powoduje znaczące zmniejszenie jakości szyfrowania.
Warto to wziąć sobie do serca robiąc prawdziwe szyfry :)
 */
