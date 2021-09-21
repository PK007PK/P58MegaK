/*
Dzielenie kodu na moduły.

W node obecnie import działa niestabilnie. Należy posługiwać się require. 
*/

const sum = (a,b) => a + b;
const divide = (a,b) => a / b;

module.exports = {
	sum: sum,
}

// lub tak: 
module.exports = {
	sum,
}

// inny plik
const { sum } = require('./index.js')
const math = require('./index.js') 
// Zwróci nam obiekt z funkcjami jako właściwości

/*

## NPM, instalowanie paczek, etc

1. npm init - tworzy packages.json wraz ze wszystkimi pytaniami o tytuł, wersję, etc
2. pytanie o entrypoint bywa ważne
3. -g globalna instalacja
4. -D developerska
5. Jak chcemy przenieść coś z prod na dev i odwrotnie to instalujemy jeszcze raz z odpowiednim -D lub bez -D i to przeorganizuje paczki
6. Wersje: jak podajemy gdzieś ^, przed czymś, to nie wejdzie na numer wyższy
7. Jeżeli chcemy zainstalować określoną wersję, nie inną bo jest ona ważna to instalujemy ją tak: npm i coś tam@10.1.0
8. Czasem są takie paczki: npm i -D @types/date-fns Edytor będzie nam więcej podpowiadał. Nie każda paczka ma types
9. npm un / uninstall
10. Jak edytujemy ręcznie package.json i chcemy aby npm uwzględnił naszą edycję to dajemy mu zwyczajnie npm i
11. package.lock to wewnętrzna, bardzo dokładna informacja npm-a
*/