/*
SELECT * FROM `students` WHERE `age` LIKE '1%'
SELECT * FROM `students` WHERE `age` >= 10 AND `age` <= 18
SELECT * FROM `students` WHERE (`age` >= 10 AND `age` <= 18) OR `age` IS NULL
SELECT * FROM `students` WHERE `age` BETWEEN 10 AND 18 OR `age` IS NULL
SELECT * FROM `students` WHERE `firstName` LIKE 'a%' AND `age` >= 18
SELECT * FROM `students` WHERE `firstName` = `lastName` AND `age` >= 18

#DELETE
DELETE FROM `students` WHERE `id` = 232328

- po ID jest bezpiecznie
- po danych - wymaga ostrożności
DELETE FROM `students` WHERE `age` IS NULL
- bez where - niebezpieczne

#UPDATE
UPDATE `cars` SET `color` = 'gold' WHERE registrationNo = "sdfsdf"
UPDATE `cars` SET `price` = 'price' * 1.2
UPDATE `cars` SET `price` = 'price' * 0.8 WHERE `price` > 1000000

#Bezpieczniejsze ID
W praktyce id generowane automatycznie są problematyczne, ponieważ są przewidywalne
Może to powodować łatwość listowania wszystkich userów. 
Na początku istniena FB miał ten problem i można było łatwo stworzyć listę wszystkich nazwisk.

Rozwiązaniem jest użycie UUID zamiast kolejnych liczb. Kolejne UUID generują się 
pseudolosowo. Wykorzystuje milisekundę kiedy został wygenerowany UUID.  

UUID -> varchar 36 -> wartość domyślna/wyrażenie UUID().
Po dodaniu takiego rekordu w heidi trzeba odświerzyć (np F5).

#Ustawianie aktuyalnej daty i czasu. Zwyczajowo createdAt
W Domyślnych dodajemy CURRENT_TIMESTAMP(). Ten rekord stworzy się 
tylko podczas tworzenia. Potem przy aktualizacjach pozostanie taki 
jaki jest. 
*/