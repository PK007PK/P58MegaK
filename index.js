/*
Przesyłanie plików. 

Możemy przekazać Express.js informację, że chcemy przesłać do klienta plik. 
W przypadku standardowego serwera Node.js nie byłoby to łatwe,
poniewarz trzeba ustalić typ MiME pliku, wczytać go, następnie przesyłać 
lub strumieniować do przeglądarki.

Jednak w Express.js możemy skorzystać z metody: 
res.sendFile()

W najprostszej wersji podajemy po prostu ścieżkę do pliku
jaki chcemy przesłać.


*/

const express = require('express');

function program1() {
    const app = express();
    app.get('/', (req,res) => {
        res.sendFile('obraz.bmp')
    })

    app.listen(3000);
}

/*
    Nie zadziałała. 

    res.sendFile()
    pozwala nam jako drugi parametr podać obiekt opcji.
    Zobaczmy na co pozwala:
    - root;
    -lastModified; - podajemy datę ostatniej modyfikacji pliku;
    -headers; - pozwala dodać nagłówki
    -dotfiles - allop/deny/ignore 
    -i inne...

    Zaprojektowano sendFile tak, żeby trzeba było jasno okreśłić ścieżkę.
    To ze względów bezpieczeństwa. 
*/

const { join } = require('path');

function program2() {
    const app = express();
    app.get('/', (req,res) => {
        res.sendFile(join(__dirname,'obraz.gif'));
    })

    app.listen(3000, () => console.log("http:/localhost:3000"));
}

//program2()

/*
łatwiej tą ścieżkę podać w opcjach, bez joina:
To i tak nie będzie bezpieczne. Nie powinno brać plików
z naszego programu. Powinien być na to jakiś określony 
folder. 
*/

function program3() {
    const app = express();
    const nazwaPliku = 'obraz.gif';

    app.get('/', (req,res) => {
        res.sendFile(nazwaPliku, {
            root: __dirname,
        });
    })

    app.listen(3000, () => console.log("http:/localhost:3000"));
}

program3()

/*
Idealnie będzie tak: 
*/

// function program4() {
//     const app = express();
//     app.get('/', (req,res)=>{
//         res.sendFile('nazwaPliku' {
//             root: join( __dirname,'files'),
//             headers: {
//                 'X-Best-JS-Information': "MegaK",
//             },
//             dotfiles:"xyz", //chodzi o pliki zaczynające się od . 
//             //Są domyślnie ukryte. Tu możemy doprecyzować naszą intencję
//             //odnośnie ukrytych plików. allow oznacza że nawet pliki z kropką
//             //moźemy przesyłać. 
//         });
//     })

//     app.listen(3000);
// }

//program4()

/*
res.attachment();
Kolejną metodą do plików jest res.attachment();
Kiedy podamy jako argument nazwę pliku - zostanie on przesłany 
jako załącznik - czyli klient, np przeglądarka - zapyta o zapis
tego pliki, zamias go wyświetlić. 

Co ciekawe Express.js w tym przypadku nie zakończy automatycznie połączenia. 
Należy pamiętać o dodaniu res.end()
Obraz się nie pokaże, tylko pobierze się jako załącznik
*/

// function program5() {
//     const app = express();
//     app.get('/', (req,res)=>{
//         res.attachment('obraz.gif' {
//             root: join( __dirname,'files'),
//         });
//         res.end(); //musi być
//     })

//     app.listen(3000);
// }

//program5()

/*
res.set()
Metoda Expressa res.set() pozwala na ustawienie dowolnych,
wewnętrznych nagłówków. Można to zrobić na dwa sposoby - 
dla pojedynczego nagłówka podając jego nazwę i wartość jako
parametry, np:
res.set('Content-Type', 'text/plain');

Kiedy chcesz ustawić więcej nagłówków, możesz przekazać obiekt
res.set({
    'Content-Type": 'text/plain",
    "Content-Length": '123,
});
*/


/*
resheadersSent
Właściwość. Zawiera informację czy nagłówki pozsały przesłane. 
Pamiętaj - przy odpowiedzi napierw ustawiaj nagłówki, potem treść 
odpowiedzi. Właśnie po to jest ta wartość - powie Ci czy nagłówki
zostały już przesłane, a więc czy teraz można wysyłać wyłącznie
treść. 
*/

/*
res.cookies()
Ciasteczka są bardzo ważną częścią sieci. Pozwalają zapamiętać pewne
krótkie informacje - jak identyfikatory, czy informację na temat 
bycia zalogowanym - na urządzeniu klienta. 
Ustawianie ciastek sprowadza się do ustawiania odpowiednich 
nagłówków. Zapamiętanie ich może nie być proste. 

Ciastko jest nagłówkiem. Musi zostać wysłane przed treścią. 
*/

// function program6() {
//     const app = express();
//     app.get('/', (req,res)=>{
//         res.cookie('ciastko': 'czekoladowe');
//         res.send('Hello world');
//     })

//     app.listen(3000);
// }

//program6()