/*
#Rzutowanie, operator <...>... i ... as ...
Rzutowanie w js to konwersja jednego typu na drugi wykonywana w sposób jawny:
*/

function basics(): void {
    const s = "hello, world";
    const num = Number(s); // -> NAN, typeof num -> 'number'
    const bool = Boolean(s) // -> true
    const json = "123";

    const data = JSON.parse(json);
    console.log(data); //123

    /*
    Powyższa data ma typ any. Ts nie jest w stanie rozpoznać czym jest. 
    Będziemy wskazywać TS, że jeden typ jest innym typem. 
    Stary sposób, który źle współgra z reactem:
    */

    const data2 = <number>JSON.parse(json);
    console.log(data2, typeof data2);

    /*
    Nowy sposób: 
    */

    const data3 = JSON.parse(json) as number;
    console.log(data3, typeof data3);

    /*
    Nie możemy powiedzieć, że data stał się number, bo on i tak był number. 
    Chodzi o to, że teraz TS wie że to number. 
    Robimy to jawnie, co jest przeciwieństwem tego, że robi to za nas program z automatu.
    Rzutowanie niejawne to inaczej konwersja, np 2 + "Hello"
    Czasem zadziała też to:
    */

    const data4: number = JSON.parse(json);
}
//basics()

/*
#Interfejsy
Określenie struktury danych. 
*/

function interfaces(): void {

    const personA = {
        name: "Bartek",
        age: 123,
        isDeveloper: true,
    }

    const personB = {
        name: "Kuba",
        age: 123,
        isDeveloper: 'Tak',
    }

    //Podobne, ale nie są porównywalne. Dane które trzymamy nie są ze sobą zgodne. 
    //Aby dane były ze sobą zgodne tworzymy najpierw interfejs który nam tego dopilnuje. 

    interface Person {
        name: string;
        age: number;
        isDeveloper: boolean;
    }

    /*
    Interface nie jest sam w sobie obiektem i nie służy do robienia obiektów. 
    Po kompilacji zniknie, zostanie usunięty. Na końcu każdego elementu można zrobić przecinek
    ale należy robić średnik. Mogą być różne konfiguracje TS i część z nich wywali błąd przy przecinku
    */

    const personC: Person = {
        name: "Bartek",
        age: 123,
        isDeveloper: true,
    }

    const personD = {
        name: "Bartek",
        age: 123,
        isDeveloper: true,
    } as Person;

    const personWProblems = {
        name: "Bartek",
        age: 122,
        lastName: "Aaaa",
        isDeveloper: true,
    } as Person;

    function greet(person: Person) {
        console.log(`Hello, ${person.name}`); //Po wpisaniu person już mamy piękne podpowiedzi.
    }

    greet(personC);
    greet({
        name: "Fafik",
    }) //Błąd brakujących właściwości

    interface PersonAdvanced {
        name: string;
        age: number;
        isDeveloper: boolean;
        greet(): string;
        greet2: () => string;
    }
}