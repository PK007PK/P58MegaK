/*
Transpilacja / kompilacja - typescript musi być zamieniony
na js i dopiero uruchomiony. Zamiana jednego kodu w drugi. 
Przeważnie z języka wyższego pozomu na język niższego poziomu. 

TS to nadzbiór js. To wszystko to co w js plus więcej. 
Jest to JS który się skaluje. Dziecko MS, opcjonalnie typowany 
i uzupełniany o nowoczesne elementy JS. 

Pozwala pisać kod bardzo zbliżony do c#. 
Domyślnie wykorzystywany w Angularze, można go także używać na 
back-endzie JS czy w React. 

const str = "Hello world"
W JS i TS tak samo. Bo nie ma sensu pisać inaczej. 
TS tam gdzie to potrzebne będzie wymuszał nadawanie typów. 
TS jest zazwyczaj pierwszy do wprowadzania nowości w JS (np dekoratory).

W angularze domyślnie musimy, w react domyślnie nie musimy, 
w node...

Jak transpilować TS?
Można użyć np:
- tsc (type script compiller);
- automatyczna transpilacja vsc lub vs;
- deno;
- ts-node;
- typescript playground;

Wstępna konfiguracja tsconfig.json:
https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

{
    "compileroptions": {
        "noImplicitAny": true, - musimy mówić jaki typ zmiennej jeżeli ma to sens, nie pozwalamy wykorzystać typu any
        "preserveConstEnums": true, - generalnie chodzi o to, aby pewien specjalny typ danych został w JS
        "sourceMap": true, - chcemy mieć source mapę, czyli coś połączenie w JS, przydatne przy debugowaniu żeby nie pisał nam gdzie błąd w js po transpilacji, skoro piszemy w ts
        "target": "es6", - docelowa wersja js
        downlevelIteration: true, - mają nam dobrze działać nowoczesne pętle (np for const of/in)
        "lib": ["dom", "es6", "dom.iterable"], - co mamy mieć dostępne
        "outDir": "dist" - wyjściowy folder
    }
}
*/