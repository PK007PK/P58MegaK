/*
    Sprawdźmy jak są pobierane liczby typu DECIMAL...
    I po co nam 
    decimalNumbers: true;
*/

const mysql = require('mysql2/promise');

const Connection = require('mysql2/typings/mysql/lib/Connection');

function program1() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
            decimalNumbers: true,
        })
       
        const [results] = await conn.execute('SELECT * FROM `cars`');
        console.log(results);
       /*
       Powyżej wszystko poszło fajnie, ale nie domyślił się że liczba
       to liczba. Aby temu zapobiec w konfiguracji połączenia dodajemy
       decimalNumbers: true;
       Ale uwaga, jeżeli skorzystamy z tej opcji możemy stracić dokładność. 
       Kiedy np zamiast prostych cen będziemy mieć jakieś dane naukowe 
       z wieloma miejscami po przecinku to będzie problem. 
       */
    })()
}
//program1()

/*
Bezpieczeństwo: SQL Injection - jeden z najpoważniejszych błędów 
bezpieczeństwa IT. 
*/

function program2() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
            decimalNumbers: true,
        })
        const regNo = `BSD14342`;
        const [results] = await conn.execute('SELECT * FROM `cars` WHERE `registrationNo` = "' + regNo +'";');
        console.log(results);
    })()
}
program2()
/*
Powyższego nie wolno robić. 
Jest to błąd bezpieczeńśtwa, tzw sql injection.

1) złośliwy użytkownik wstawi w regNo '"OR"" = "' - co wyświetli wszystkie samochody
Wyświetl kiedy reg no to empty string lub kiedy emty string to empty string, 
czyli wszystko.

2) jeżeli masz multipleStatements: true oraz query zamiast execute złośliwy user:
";DROP TABLE `cars`;SELECT"
Poniżej jak zrobić żeby było bezpieczne. 
W SQLa wstawiamy ? - to jest zmienna sql, on wie że tu ma miejsce na 
zmienną, a nie na komendę. To jest chyba prepared statement
*/

function program3() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
            decimalNumbers: true,
        })
        const regNo = `BSD14342`;
        const [results] = await conn.execute('SELECT * FROM `cars` WHERE `registrationNo` = ?;',[regNo]);
        //Każdy kolejny pytajnik odpowiada elementowi tablicy w której powyżej jest
        //regNo
        console.log(results);
    })()
}
//program3()

/*
Są lepsze i wygodniejsze prepared statements
:nazwa i obiekty... Zwłaszcza kioedy używamy coś kilkukrotnie

*/

function program4() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
            decimalNumbers: true,
            namedPlaceholders: true, // trzeba tu dodać!!
        })
        const value = 10000;
        const {affectedRows} = await conn.execute(
                'UPDATE `cars` SET `price` = `price` + :myValue WHERE `price` > :myValue',
                {
                    myValue: value,
                }
            )[0];
        console.log(affectedRows);
    })()
}
//program4()


/*
Prepared statement to dodatkowa wydajność. 
MySl może raz przygotować strategię i potem aplikować ją do wielu zapytań
Wtedy należy użyć prepare i execute
Przykładem jest dodawanie w ten sposób wielu rekordów. 
Np powyższe sql zrobi bardzo szybko
*/

function program5() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
            decimalNumbers: true,
            namedPlaceholders: true,
        })

        const cars = [
            {
                registrationNo: 'AAA',
                brand: 'AAA brandt',
                model: 'AAA model',
                color: 'AAA color',
                firstRegistrationAt: '2021-12-01',
                price: '100',
            },
            {
                registrationNo: 'BBB',
                brand: 'BBB brandt',
                model: 'BBB model',
                color: 'BBB color',
                firstRegistrationAt: '2021-12-01',
                price: '1000',
            },
            {
                registrationNo: 'CCC',
                brand: 'CCC brandt',
                model: 'CCC model',
                color: 'CCC color',
                firstRegistrationAt: '2021-12-01',
                price: '10000',
            },
        ]

        const statement = await conn.prepare('INSERT INTO `cars` VALUES(?, ?, ?, ?, ?, ?)');
        try {
            for (const car of cars) {
                await statement.execute(Object.values(car));
            }
        } finally {
            statement.close();
        }

    })()
}

program5()