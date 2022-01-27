/*
#Export, default export
require to common js. 

Export i import problematyczne w common js od zawsze wspierany jest w TS.
*/

// enum Gender {
//     Woman,
//     Man,
//     Xyz,
// }

// console.log(Gender[Gender.Woman]);

//1
// export {
//     Gender,
// }

//2
/*
export enum Gender {
    Woman,
    Man,
    Xyz,
}
*/

//Zmiana nazwy w imporcie
//const {Gender: Sex} = require('./types/gender');
//const {Gender as Sex} = require('./types/gender');


//Defaultowe są nienazwane, więc unika się ich aby możliwa było podpowiadanie składni.

//Import default może nadać dowolną nazwę. 

//W osobnym pliku: types/index.ts robimy coś takiego
export * from './gender';
export * from './single-todo';

//W pliku index.ts (ale nie w types) możemy to teraz zainportować:
import {} from './types' //Jak wklikamy się w ten import {} to dostaniemy tam wszystko, co jest importowane z typów.
//Nie musimy sobie przypominać jak co się nazywa

//Eksportowanie klas. Trzymamy się zasady. Jedna klasa - jeden plik. 
export class TodoApi {
    create() {}
    something() {}
}

/*
Staramy się bez export default
Eksportujemy to co niezbędne
Nie używamy wielu namespaców
Nie eksportój name spaców jeżeli nie musisz
1 klasa = 1 plik
1 klasa = 1 eksport
*/

/*
# Pliki definicji
Niebieska ikonka TS w npmjs.com oznacza, że jak zainstalujesz daną paczkę to dostaniesz jednocześnie
wszystkie pliki definicji. 

Biała ikonka z DT oznacza że opcjonalnie można doczytać definicje. 
npm i @types/express -D - zazwyczaj tak wygląda paczka z typami. Trzeba pamiętać, żeby to było w dev dep. 
*/