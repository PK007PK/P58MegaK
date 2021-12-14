/*
Zadanie: 
1. Stworzyć nowy projekt, zainstalować mysql2 i skonfigurować połączenie.
2. W bazie danych mega_courses wykonać za pomocą kodu następujące operacje:
a wyświetlić wszystkioe kursy jakie mamy dostępne;
b wybieramy wszystkich kursantów (id, imię, nazwisko), którzy mają min 18 lat
wraz z nazwami kursów na jakich są (Kursanci mogą się powtarzać, to jest ok)
c usuwamy wszystkich kursantów, którzy są niepełnoletni i wyświetlamy ilu zostało 
usuniętych, Korzystamy z parametrów;
d Dodajemy nowego kursanta z kodu (korzystamy z parametrów) i wyświetlamy jego ID
*/

const mysql = require('mysql2/promise');
const {v4: uuid} = require('uuid'); //UUIDv4

function zadanie() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'mega_courses',
        namedPlaceholders: true, //prepared statements
        decimalNumbers: true,
    });

    (async() => {
        //2a
        const [courses] = await pool.execute('SELECT * FROM `courses`');
        console.log(courses);
        //2b
        const [studentsAndCourses] = await pool.execute('SELECT `students`.`id`, `students`.`firstName`, `students`.`lastName`, `courses`.`name` FROM `students` JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name` WHERE `students`.`age` >= 18');
        console.log(studentsAndCourses);
        //2c
        /*
        To zadziała, jeżeli w tabeli pośredniej ustawimy dla usuwania "cascade"
        :age możemy zastosować, bo uruchomniliśmy sobie named placeholder
        */
        const {affectedRows: deletedStudentsUnderGivenAge} = (await pool.execute('DELETE FROM `students` WHERE `age` < :age', {age: 18}))[0];
        console.log(deletedStudentsUnderGivenAge);

        //2d

        /*
        Próba uzyskania uuid w ten sposób zawiodła, nie da się. Nie ma sprawy, bardziej zaawansowanymi narzędziami będziemy to robili i i tak nie będzie potrzebne. 
        Tzn w bazę danych wstawiło ID, ale nie pobrało go od razu. Dlatego poniżej aby to uuid mieć wygeneruje go poprzez uuid. Równie dobrze mógłby najpierw dodać do bazy tworząc id
        automatycznie, a potem moglibyśmy je pobrać aby wyświetlić. 

        const {insertId} = (await pool.execute('INSERT INTO `students`(`firstName`, `lastName`, `age`, `addressStreet`) VALUES(:firstName, :lastName, :age, :addressStreet)', {
            firstName: "Anna", 
            lastName: "Kowalska", 
            age: 22, 
            addressStreet: "Pcimska 12",
        }))[0];
        console.log(insertId);
        Ratujemy się instalując uuid
        */

        const newStudentId = uuid();
        await pool.execute('INSERT INTO `students`(`id`, `firstName`, `lastName`, `age`, `addressStreet`) VALUES(:firstName, :lastName, :age, :addressStreet)', {
            id: newStudentId,
            firstName: "Anna", 
            lastName: "Kowalska", 
            age: 22, 
            addressStreet: "Pcimska 12",
        });
        console.log(insertId);

        await pool.end();
    })();
}

zadanie();