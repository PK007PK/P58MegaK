/*
#Tabela jeden do jednego
JOIN - pobieranie relacji
SELECT * FROM `students` JOIN `courses` ON `students`.`courseName`=`courses`.`name`
powyższe zestawiają dane z obydwu tabel. Wynikami są dane zawarte w oby
tabelach. Więc jeżeli ktoś przy kursach ma nulla to nie zostanie
uwzględniony w wynikach.Domyślny jest inner JOIN, dlatego powyżej w kwerendach nie widzieliśmy
różnicy zamieniając miejscami students i courses

SELECT * FROM `courses` JOIN `students` ON `students`.`courseName`=`courses`.`name`

Typy JOINów:
- Inner Join - część wspólna
- Full Join - wszystko
- left Join - cała lewa i część wspólna
- Right Join - cała prawa i część wspólna

W My SQL nie ma składni do pobrania full joina. 

SELECT * FROM `students` LEFT JOIN `courses` ON `students`.`courseName`=`courses`.`name`

#Tabela wiele do wielu
Robimy taką tabelę, z wykorzystaniem tabeli pośredniej.
SELECT * FROM `students` JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 

SELECT * FROM `students` 
	JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 
	JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name`

SELECT `students`.`firstName`, `students`.`lastName`, `courses`.`name`  FROM `students` 
	JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 
	JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name`

SELECT `students`.`firstName`, `students`.`lastName`, `courses`.`name`  FROM `students` 
	JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 
	JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name`
	ORDER BY `courses`.`name` DESC

SELECT `students`.`firstName`, `students`.`lastName`, `courses`.`name`  FROM `students` 
	JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` 
	JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name`
	WHERE `courses`.`name` LIKE '%mega%'
	ORDER BY `courses`.`name` DESC
*/