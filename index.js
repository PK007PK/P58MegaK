/*
UPDATE `cars` SET `color` = '#000000 metalik' - podmieni wszystkie kolory
UPDATE `cars` SET `firstRegistrationAt` = CURRENT_TIMESTAMP() WHERE `price` < 100000;
UPDATE `cars` 
    SET 
        `color` = '#ffffff', 
        `firstRegistrationAt` = CURRENT_TIMESTAMP() 
    WHERE `price` < 100000;
DELETE `cars` WHERE `price` < 100000;

#Relacje
- jeden do jeden
- lumijeden do wielu
- wiele do wielu (np czat i pokoje)
- relacja sam do siebie

UML - system projektowania systemów
Do wszystkiego, także do projektowania baz danych
diagrams.net



*/