/*
SELECT `students`.`firstName`, `students`.`lastName`, `courses`.`name`  FROM `students` 
	JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 
	JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name`
	WHERE `courses`.`name` LIKE '%mega%'
	ORDER BY `courses`.`name` DESC

INSERT INTO `cars_places`(`carRegistrationNo`, `placeId`) 
	VALUES ('SAS232312', '715e11d9-58b5-11ec-9d90-482ae31bc77f')

    ..może być wiele values


    SELECT `cars`.`registrationNo`, `cars`.`brand`, `cars`.`model`, `places`.`adress` 
	FROM `cars`
	JOIN `cars_places` ON `cars`.`registrationNo` = `cars_places`.`carRegistrationNo`
	JOIN `places` ON `cars_places`.`placeId` = `places`.`id`
	WHERE `cars`.`price` > 10000

#Bazy danych w kodzie to mysql2 w wersji promisowej
- ma szeroką obsługę wtyczek;
- jest bardzo szybki;
- wspiera promisy;
- jeden z najbardziej znanych sterowników

W przypadku baz danych lepiej nie korzystać z nodemona
*/

const mysql = require('mysql2/promise');

function program1() {
    (async() => {
        // create the connection to database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
        })
        console.log(connection);
        await connection.end();
    })()
}
//program1()

function program2() {
    //conn.execute() - wykonanie komendy sql
    (async() => {
        // create the connection to database
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
        })
        //console.log(info);
        //const info = await conn.execute('SELECT * FROM `cars` WHERE `registrationNo` = "ABV12312"');
        // powyższe zwróci nam tablicę, pierwszy element to będą dane, drugi info dodatkowe.
        // stosujemy destrukturyzację poniżej aby zgrabnie dojść do miodku. 
        const [info] = await conn.execute('SELECT * FROM `cars` WHERE `registrationNo` = "ABV12312"');
        console.log(info);
        console.log(info[0].firstRegistrationAt);
        console.log(info[0].firstRegistrationAt instanceof Date);
    })()
}
//program2()

/*
UPDATE/DELETE wprowadza zmiany do tablicy
ważne jest affectedRows
*/

function program3() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
        })
        //const answear = await conn.execute('UPDATE `cars` SET `price` = `price` + 1000000 WHERE `registrationNo` = "ABV12312"');
        //Poniżej najszybszy sposób wyciągnięcia informacji jak wiele rekordów zmodyfikowaliśmy
        const {affectedRows} = (await conn.execute('UPDATE `cars` SET `price` = `price` + 1000000 WHERE `registrationNo` = "ABV12312"'))[0];
        console.log(affectedRows);
    })()
}
//program3()

function program4() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
        })
        //const answear = await conn.execute('UPDATE `cars` SET `price` = `price` + 1000000 WHERE `registrationNo` = "ABV12312"');
        //Poniżej najszybszy sposób wyciągnięcia informacji jak wiele rekordów zmodyfikowaliśmy
        const answer = await conn.execute('INSERT INTO `cars` VALUES("SJZ 001", "Mercedes", "AMG", "#ee0000 metalik", "2021-12-12", 200000)');
        console.log(answer);
        //Czyli struktura odpowiedzi jest taka sama jak przy update
    })()
}
//program4()

function program5() {
    (async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'megakurs',
        })
        //const answear = await conn.execute('UPDATE `cars` SET `price` = `price` + 1000000 WHERE `registrationNo` = "ABV12312"');
        //Poniżej najszybszy sposób wyciągnięcia informacji jak wiele rekordów zmodyfikowaliśmy
        const {insertId} = (await conn.execute('INSERT INTO `cars_places`(`carRegistrationNo`, `placeId`) VALUES("SJZ 001", "2e3c10d6-58b7-11ec-9d90-482ae31bc77f")'))[0];
        console.log(insertId);
        /*
        Czyli struktura odpowiedzi jest taka sama jak przy update. 
        insertId - ostatnio dodany is. Działa i na auto_increment i na uuid
        */
    })()
}
program5()