/*
SELECT * FROM `cars` WHERE `brand` = "opel"
SELECT * FROM `cars` WHERE `brand` <> "opel"
SELECT `model`, `color` FROM `cars` WHERE `brand` = "opel"


##FUNKCJE AGREGUJĄCE:
COUNT(*) - zliczanie rekordów
SELECT COUNT(*) FROM `cars` WHERE `brand` = "opel"
SELECT COUNT(*) AS `cnt` FROM `cars` WHERE `brand` = "opel"

##SUM(pole)
SELECT SUM(`price`) FROM `cars`
SELECT SUM(`price`), COUNT(*) AS `number` FROM `cars`

SELECT 
    SUM(`price`) AS `priceSUM`,
    COUNT(*) AS `cnt`,
    (SUM(`price`) / COUNT(*)) AS `avg price` 
FROM `cars`


#Daty
Uwaga! W necie jest bardzo dużo wolnych porad!

Co zrobić aby było szybko:
- nie używamy * tylko konkretnie piszemy czego nam trzeba;
- Daty mają być w formacie `YYYY-MM-DD hh:mm:ss`
SELECT * FROM `cars` WHERE `firstRegistrationAt` = "2020-10-23 00:00:00"
SELECT * FROM `cars` WHERE `firstRegistrationAt` > "2019-10-23 00:00:00"
SELECT * FROM `cars` WHERE `firstRegistrationAt` > "2019-10-23 00:00:00" AND `firstRegistrationAt` < "2021-10-23 00:00:00"
SELECT * FROM `cars` WHERE `firstRegistrationAt` BETWEEN "2019-10-23 00:00:00" AND "2021-10-23 00:00:00"
powyższe większy, mniejszy lub równy - jest domknięte

#Możemy sprawdzać, czy dany ciąg znaków występuje w tekście. 
Korzystamy do tego z pola LIKE 'xxx'
Oprócz tekstu podajemy tam % - dowolny ciąg znaków _ dowolny jeden znak
SELECT * FROM `cars` WHERE `brand` LIKE 'S%' - kiedy zaczyna się od S
SELECT * FROM `cars` WHERE `brand` LIKE '%S%
wielkość liter nie ma znaczenia bo tak skonfigurowaliśmy bazę kiedy ją tworzyliśmy

#Dodawanie rekordów
INSERT INTO `cars` VALUES('carsSDSD1212', 'Fiat', 'Brawo', 'red', 2021-11-12, 2000)
możemy też wypisać gdzie chcemy dodać dane:
INSERT INTO `cars`(`registrationNo`, `brand`) VALUES('carsSDSD1w2', 'Fiat')
INSERT INTO `cars`(`brand`) VALUES('Fiat')
powtarzając  po przecinku kolejne values dodajemy wiele jednocześnie. 
*/