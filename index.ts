/*
#TS w VSC
npm i -g typescript
potem txc --version

.vscode/tasks.json
Plik automatyzacji. Mówi aby obserwować pliki JS i automatycznie je kompilowć do TS. 
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "typescript",
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "option": "watch",
            "auto": true,
            "problemMatcher": [
                "$tsc-watch"
            ]
        }
    ]
}

Pobieamy:
https://marketplace.visualstudio.com/items?itemName=philfontaine.autolaunch


Ciekawostka. Elementem deno jest TS. Po zainstalowaniu piszemy deno run index.ts i jest. 


Inna opcja uniwersalna do odpalania TS (w node)
1. Zainstaluj npm i -D ts-node
2. Uruchamiaj plik główny np. tak: ts-node index.ts (może wymagać restartu terminala)
3. Można dodać skrypt. 

package.json
    "start": "ts-node index.ts"

npm run start

Powyższe wymaga wielokrotnego uruchamiania. Automatyzacja:
1. npm i ts-node-dev --save-dev
2. tsnd index.ts lub skrypt

Fajna rzecz typescript.org/play
Można podglądać jak kompiluje. Fajne do zabawy.
*/

const abc: string = "Hello, world";

console.log(abc);


/*
#Opcjonalne typowanie:
const abc: string = "Hello, world";
*/

function foobar(a,b) {
    return 2 * a;
} //a, b domyślnie ma any. W tym miejscu dobry js przestaje być dobrym ts. 

function sum(a,b) {
    return a + b;
}

console.log(sum(2,'5')); // -> '25'
//Domyślnie w TS jest tak, że nawet jeżeli w konsoli są błędy, to jeżeli może to 
//wyprodukuje JS.

function sum2(a: number,b: number) {
    return a + b;
}

//wp console.log(sum2(2,'5')); // podkreśli 5 jako nieprawidłowy a przy kompilacji rzuci błędem. 

function sum3(a: number,b: number): number {
    return a + b;
} //Oznaczamy co ma funkcja wyprodukować. Wystarczy w tym przypadku ten trzeci number. 

function sum4(a: number,b: number): string {
    return a + b;
} //pokaże nam błąd. Number + Number nie da stringa. 

function sum5(a: number,b: number): string {
    return String(a + b);
} // tu już nie pokazuje błędu

function addAndShow(a: number,b: number): string {
    console.log(a + b);
} // pokazuje błąd, żeby było ok to bez trzeciego stringa

function addAndShow2(a: number,b: number): void {
    console.log(a + b);
} // void to specjalny typ dla f która nie ma niczego wzracać. Funkcja ma typ void. 

function addAndShow3(a: number,b: number) {
    return a + b;
} // prosty do średniego kod ts jest w stanie sam zrozumieć i dopowiedzieć sobie, że ta funkcja ma typ number. 

//Any to takie dosłowne powiedzenie "Nie interesuje mnie to"

function foobar2(a: number,b: number) {
    if (a === 0) {
        return null;
    }
    return a + b;
} // Źle widzi typ wyjściowy. Twierdzi że jest to number. Ale nie będzie z tym problemu bo TS chroni nas przed błędami na etapie pisania, nie wykonania. 

function foobar3(a: number,b: number): number {
    if (a === 0) {
        return null;
    }
    return a + b;
} // Tu już powinien podkreślić return null, ale u mnie z jakiegoś powodu nie podkreśla... 

function foobar4(a: number,b: number): number | null {
    if (a === 0) {
        return null;
    }
    return a + b;
} // Tu już powinien podkreślić return null, ale u mnie z jakiegoś powodu nie podkreśla... 

const summm = (a: number | string, b: number | string): number | string => {
    return a + b; // Wyjaśnienie w następnej lekcjiWczo
};