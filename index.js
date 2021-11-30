/*
SQL za pomocą kodu. 
Składnia trochę inna niż w JS. 
Pobieranie danych za pomocą kodu.
Wielkość liter bez znaczenia

Wchodzimy w określoną zakłądkę i strzał:

SELECT * FROM `students`;
Wywołanie tego w Heidi: F9

Zapis tekstów
- dla nazw baz, tabel, pól używamy `backticków`
- dla pozostałych stringów używamy 'apostrofów' lub
"cudzysłowów".

Jeżeli zrobimy błąd informacje o nich zawsze są bardzo słabe.

SELECT `firstName` FROM `students`;
SELECT `firstName`, `lastName` FROM `students`;
Powyżej kolejność dowolna.

"Where"
SELECT * FROM `students` WHERE `id` = 2;

Operatory:
= -> porównanie
<> -> inny niż
> 
<
NOT -> zaprzeczenie
IS NULL -> czy null
OR -> lub
AND -> oraz

Kto jest nulerm, to może zadziałać, a może nie:
SELECT * FROM `students` WHERE `age` = NULL;

Powinno być
SELECT * FROM `students` WHERE `age` IS NULL;
SELECT * FROM `students` WHERE `age` IS NOT NULL;

SELECT * FROM `students` WHERE `age` IS NOT NULL AND `age` < 50;
(to powyższe przez przypadek to masło maślane)


SELECT * FROM `students` WHERE `firstNAme` = "X" OR `firstName` = 'Zagadka';
SELECT * FROM `students` WHERE `id` = "1" OR `id` = "3";

SELECT * FROM `students` WHERE `id` IN ("1", "3"); stringi?
SELECT * FROM `students` WHERE `age` IN (50, 100); liczby?
SELECT * FROM `students` WHERE `age` IN (50); liczby?

Sortowanie:
SELECT * FROM `students` WHERE `age` IN (50, 100) ORDER BY
`lastName` ASC

SELECT * FROM `students` ORDER BY `age` DESC;

Kolejność jest istotna 1) selekt 2) logiczne 3) sortowanie 4) paginacja

Paginacja:
LIMIT offset, count

Jeżeli dajemy bez limit, to domyśłnie i tak mamy limit. 

LIMIT jak przyjmie jedną to to będzie count, czyli ile chcemy
wyświetlić danych. 

SELECT * FROM `students` ORDER BY `age` DESC LIMIT 2;

Dodajemy offset (zacznij od pierwszej -> ważny przecinek pomiędzy 1 i 2)
SELECT * FROM `students` ORDER BY `age` DESC LIMIT 1, 2; 
*/