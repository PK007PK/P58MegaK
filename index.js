/*
    Tworzenie hasha jednym z wbudowanych algorytmów
    hmac - funkcje skrótu
    Zauważmy, że jest to f synchroniczna. Blokująca. Obciążająca. Celowo.
*/

// const { createHmac, pbkdf2 } = require('crypto');
// const { hash, compare } = require('bcrypt');

/*
    Dobry
 */
function program1() {
    const salt = 'AMD@o2amdmoqdwasd adas d as asdf sdf sdfsd 23434545 645yt try  try4564 6345 fsdf sdfs dfsdwetrh sdSDFSDFhdfg d as asda s/....';
    const hash = createHmac('sha512', salt)
        .update('Tekst do zhashowania')
        .digest('hex');
    console.log(hash);
}

//program1()


/*
Lepszy
 */
function program2() {
    const originalTxt = "Tekst do zhashowania";
    const salt = 'AMD@o2amdmoqdwasd adas d as asdf sdf sdfsd 23434545 645yt try  try4564 6345 fsdf sdfs dfsdwetrh sdSDFSDFhdfg d as asda s/....';
    pbkdf2(originalTxt, salt, 100000, 64, 'sha512', (err,derivedKay)=>{
        if (err) throw err;
        console.log(derivedKay.toString('hex'));
    })
}

//program2()

/*
Najlepszy. Należy zainstalować bcrypt
Jest odporna na próby odkodowania za pomocą tabel tęczowych
Funcja jest asynchroniczna. Widć to po callbacku
Sól: tworzy ją automatycznie i koduje w środku. Liczba oznacza ilość rund twrzenia soli.
Hash będzie miał tu bardzo duży zakres znaków, także znaki specjalne.

 */

function program3() {
    hash('Tekst do zahashowania', 10, (err, hash) => {
        if (err) {
            console.error(err);
        } else {
            console.log(hash);
        }
    })
}

//program3();

/*
Zauważmy, że powyższe da nam zawsze inny hash, czyli nie możemy sobie go łatwo porównać i sprawdzić
czy są takie same. Musimy do tego wykorzystać funkcję porównującą. Weryfikującą czy hash jest poprawny.
pobieramy funkcję compare.
 */

function program4() {
    hash('Tekst do zahashowania', 10, (err, hash) => {
        if (err) {
            console.error(err);
        } else {
            console.log(hash);
            //callback hell się zaczyna:
            compare('Tekst do zahashowania', hash, (err, res)=>{
                if (res) {
                    // Pass match
                    console.log("Logged in");
                } else {
                    // Pass don't match
                    console.log("Nope!");
                }
            })
        }
    })
}

//program4();
