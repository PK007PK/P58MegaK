/*
Zadanie: 
1. Stworzyć nowy projekt, zainstalować mysql2 i skonfigurować połączenie.
2. W bazie danych mega_courses wykonać za pomocą kodu następujące operacje:
- wyświetlić wszystkioe kursy jakie mamy dostępne;
- wybieramy wszystkich kursantów (id, imię, nazwisko), którzy mają min 18 lat
wraz z nazwami kursów na jakich są (Kursanci mogą się powtarzać, to jest ok)
- usuwamy wszystkich kursantów, którzy są niepełnoletni i wyświetlamy ilu zostało 
usuniętych, Korzystamy z parametrów;
- Dodajemy nowego kursanta z kodu (korzystamy z parametrów) i wyświetlamy jego ID
*/

const mysql = require('mysql2/promise');

function zadanie() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'mega_courses',
        namedPlaceholders: true, //prepared statements
        decimalNumbers: true,
    });

    (async() => {
        const [res] = await pool.execute('SELECT * FROM `courses`');
        console.log(res);
        await pool.end();
    })();
}

zadanie();