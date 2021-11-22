Baza d - miejsce łatwego przechowywanbia danych. 
Łatwe zarządzanie: dodawanie, pobieranie, usuwanie,
aktualizowanie.

Bazy posiadają serwer. Można z nim rozmawiać przez API.
Popularne serwery bazodanowe: np phpMyAdmin, Heidi. 

Bazy są dobre:
- w przchowywaniu na stałe danych - moghą być gigantyczne. 
- wyszukiwaniu danych;
- wysokiej przepustowości. 

Bazy są trudne.

BAzy relacyjne (pewne tabele mogą być powiązane):
Przechowujemy dane w postaci tabel - jak excel.
- baza danych - jak plik w excelu;
- jedna baza oznacza zwykle jedną aplikację;
- tabela - jak arkusz w excelu (skoroszyt);
- kolumna - w bazie też kolumna;
- rekord / encja - to jak wiersz w excelu;
- pole / komórka - tak jak w excelu;

Czy excel może być bazą danych - tak, ale to średni pomysł. 
Jest to wygodne, ale ex przy większej ilości danych jest 
bardzo mało wydajny. 

Nierelacyjne bazy danych
- przechowują dane w nieco luźniejszej formie. Przypomina to json-a.
Czasem są jsonem. Łatwo się łączą z JS.
Np. każdy produkt może posiadać własne dane informacje na swój temat.

Istnieją także inne rodzaje bez. 

SQL. Najczęściej wykorzystywany język podczas pracy z 
relacyjnymi bazami danych. Ma wiele dialektów. 

MySQL. Jedna z najbardziej rozpoznawalnych baz danych na świecie. 
Świetna dla początkujących, nadaje się również do dużych, poważnych
serwisów. Jest to relacyjna baza. Popularną odmianą jest maria DB. 
Wszystko jedno czy korzystamy z MySql czy z MariaDB. Są totalnie podobne. 

MySql na windows. 
Najłatwiej zainstalować cały stack xampp: apachefriends.org 
Po zainstalowaniu możesz łatwo uruchomić bazę.

phpMyAdmin
Do zarządzania bazą danych możesz wykorzystać wiele 
dostępnych narzędzi. np. oficjalnego klienta MySql. Korzystając z 
gotowych dużych paczek jak opisywany xampp czy mamp - otrzymujemy 
do dyspozycji phpMyAdmin. 
PHPmyAdmin dostępny będzie prawdopodobnie pod adresem: localhost/phpMyAdmin
Jest to narzędzie najprostsze do nauki, mało wszechstronne - zwłaszcza jeżeli
chodzi o duże zbiory danych. 

Bardziej zaawansowane niż PhpMyadmin jest HeidiSQL: heidisql.com - polecany na kursie.

