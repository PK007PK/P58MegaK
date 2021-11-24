- Typ kolumny;
- Indeksy (poprawiają jej szybkość, są dla wartości często wyszukiwanych)
    jednocześnie powodują, że więcej danych jest przechowywanych 
    na dysku, baza jest cięższa
- Klucz główny (primary key)
    specjalny index, unikalny identyfikator. wyszukiwanie po nim
    jest bardzo szybkie, jest unikalny, 
- Klucze obce
    do relacji, teraz tyle
- AUTO_INCREMENT
    specjalna właściwość dla klucza głównego. żadna liczba nigdy nie
    będzie powtórzona. 
- NULLABLE = NULL 
    np ktoś nie chce podać wieku, nic nie podaje, jest tam null.
    Np dana kolumn może być liczbą lub nullem.

Po co projektowanie
- żeby baza była szybka;
- żeby nie była za duża;
- żeby jednocześnie zmieściło się to co potrzeba;

Długości danych mogą być: 
- zbyt krótkie - nie zmieszczą się
- zbyt długie - obciążąją bazę bez potrzeby
- idealne

Baza ma limit wszystkich znaków łącznie. Nie możemy dać 1000 kolumn umożliwiających 
podawanie danych 1000 znakowych.

Typy kolumn:
- varchar (string, max 1024). Zawsze trzeba podać długość
- int i podobne. Liczby całkowite. Długość jako ilość cyfr.
- decimal i podobne, zmiennoprzecinkowe. ilość cyfr ogółem, w tym ilość cyfr po przecinku
- text i podobne. Nie musi nawet zawierać długości. tiniy, medium, long.
Wyszukiwanie po tekstach oraz inne operacje są bardzo wolne. Teksty są trzymane w osobnym
miejscu. 
- date + time
