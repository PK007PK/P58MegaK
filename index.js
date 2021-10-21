/*
Layout engines
Silniki widoków. 

To co jest obecnie w cookie, ten html jest niebezpieczne i nieczytelne. Aby tego uniknąć stosuje się
języki szablonów. Jednym z najomopularniejszych w js jest Handlebars.

Użyjemy express-handlebars..

Przekazanie danych do handlebars:
{{zmienna}}
<h1>Witaj {{ imie }}</h1>

Bardzo ważne i związane z bezpieczeństwem:
1. Nikt Ci nie zrobi domyślnie ataku XSS. Sprawdźmy
2. Nigdy nie generuj np. dunamicznie JS. Handlebars bezpiecznie traktuje tylko HTML.
3. Nigdy nie przekazuj wszystkich danych przesłanych przez użytkownika. 

Nie rób tego: ale jak musisz a to się zdarza:
{{{zmienna}}} trzy nawiasy zamiast dwóch . Do tego możemy przekazać htmla. 

Partiale
Coś nie jest częścią szablonu, ale często się powtarza. Automatyzuje się to właśnie poprzez partiale. 
Domyślnie znajdują się w views/partials

Użycie partiala {{>nazwaPLiku}}

Inne elementy i ułatwienia (helpers):
komnetarze: {{!-- sdsd --!}} Taki nie wyląduje w html. Komentarz htmlowy użyty w handlebarsach będzie widoczny w źródle. 

Pętla + co jeżeli nie ma wyników
{{#each dates}}
    <li>{{this}}</li>
    {{else}}
    <li>Brak wyników</li>
{{/each}}

Warunki . Powodują że w źródle strony nie będzie pustego taga i inne. 
{{#if warunek}}
    Tak
{{/if}}

Odwrotny
{{#unless warunek}}
    Nie
{{/unless}}

{{#if name}}
    <h1>{{name}}</h1>
    {{else}}
    <h1>Brak imienia</h1>
{{/if}}

{{#unless name}}
    <p>Brak imienia</p>
{{/unless}}

Ale już nie sprawdzimy if 10 > 0, te ify służą tylko do sprawdzania czy coś istnieje, czy jest puste. 
Logikę więc przenosimy do miejsca gdzie renderujemy


console.log tylko w hb -> {{log name age surname sex}}
console.log tylko w hb -> {{log 'name' name 'age' age 'surname' surname 'sex' sex}}
*/