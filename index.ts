/*
#Interface CD
*/

function interfaceCD(): void {

    interface Person {
        name: string;
        age: number;
        isDeveloper: boolean;
        greet(): string;
        // greet2: () => string;
    }

    const person: Person = {
        name: 'Bartek',
        age: 123,
        isDeveloper: true,

        greet(): string {
            console.log(`Hello, ${this.name}`);
            return `Hello, ${this.name}`;
        }
    }

    // function dateOfBirth(person: Person): number {}

    function dateOfBirth({age}: Person): number {
        return new Date().getFullYear() - age
    }

    console.log(dateOfBirth(person));

    // Dodajemy achievements pod spodem 
    const jacek: Person = {
        name: 'Jacek',
        age: 123,
        isDeveloper: true,
        //achievements: ['Abc', 'Bbb'],

        greet(): string {
            console.log(`Hello, ${this.name}`);
            return `Hello, ${this.name}`;
        }
    }

    const placek: Person = {
        name: 'Placek',
        age: 123,
        isDeveloper: true,

        greet(): string {
            console.log(`Hello, ${this.name}`);
            return `Hello, ${this.name}`;
        }
    }
    
}
//interfaceCD();


function program1(): void {
    // Dodajemy achievements jednemu, a drugi nie ma osiągnięć. Jak to zrobić, żeby mogli być różni?

    interface Person {
        name: string;
        age: number;
        isDeveloper: boolean;
        achievements?: string[] //Może być, ale nie musi -> ? . Właściwość opcjonalna. 
        greet(): string;
    }

    const jacek: Person = {
        name: 'Jacek',
        age: 123,
        isDeveloper: true,
        achievements: ['Abc', 'Bbb'],

        greet(): string {
            console.log(`Hello, ${this.name}`);
            return `Hello, ${this.name}`;
        }
    }

    const placek: Person = {
        name: 'Placek',
        age: 123,
        isDeveloper: true,

        greet(): string {
            console.log(`Hello, ${this.name}`);
            return `Hello, ${this.name}`;
        }
    }

    console.log(jacek.achievements); //Przy niektórych konfiguracjach to może nam dać błąd. Bo jeden ma osiągnięcia a drugi nie. 
    console.log(placek.achievements); 

    //Kolejny przykład:
    const ar: Person[] = [] //To ma być tablica obiektów person
}


// Przykład pokazujący kiedy TS nie zadziałas
function program2(): void {
    interface Person {
        name: string;
        surname: string;
        age: number;
    }

    const json = '{"name":"Kuba","dateOfBirth":2000}';

    const person: Person = JSON.parse(json);

    console.log(person.surname);
    // Nie mamy błędu, wszystko jest ok, aż do loga. JSOn okazał się jednak nie być Personem
    // a ts tego nie wykrył. 
}

/*
Klasy mogą implementować interfejsy
*/

function program3(): void {
    class Person {
        constructor(name: string, age: number) {
        //    this.name = name;
        //    this.age = age;
        }
    }

    /*
    Pojawił się błąd, pomiomo że wszystko w JS zadziała jak trzeba. 
    TS chce aby wszystko było poukładane, aby wszystko było najpier
    wypisane. 
    */

    class Person2 {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

    const bartek = new Person2("Bartek", 100);
    console.log(bartek);

}

/*
Dalsza rozbudowa. Łączenie klasy z interfejsem.
Łączenie klasy i interfejsu ma być standardowym działaniem.
K twierdzi że u niego w firmie rzadko kiedy jest klasa bez i. 
*/

function program4() {
    
    interface Human {
        name: string;
        surname: string;
        age: number;
    }

    class Person implements Human {
        name: string;
        age: number;
        surname: string; // Brak surname teraz spowodowałby błąd
        //surname: string = ""; Możemy dodać domyślną wartość. 
        
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }
}

/*
Implementować możemy wiele klas.
*/

function program5() {
    
    interface Human {
        name: string;
        surname: string;
        age: number;
    }

    interface History {
        history: string[];
        showHistory(): void;
    }

    class Person implements Human, History {
        name: string;
        age: number;
        surname: string = ""; //Wrzucamy tu domyślne, aby nic już do konstruktora nie dodawać 
        history: string[] = [];
        
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
        showHistory(): void {
            console.log(this.history);
        }
    }
}

/*
Interfejsy mogą rozszerzać inne interfejsy
*/


function program6() {
    
    interface Human {
        name: string;
        surname: string;
        age: number;
    }

    interface HumanWithRole extends Human {
        role: string;
    }

    class User implements HumanWithRole {
        role: string;
        name: string;
        surname: string;
        age: number;
    }
}

/*

*/

function program7() {
    
    interface Human {
        name: string;
        surname: string;
        age: number;
    }

   interface HistoryEntry {
       createdAt: Date;
       event: string;
   }

   interface History {
       history: HistoryEntry[];
   }

   /*
   Można też tak: 

    interface History {
        history: {
            createdAt: Date;
            event: string;
        }[]
    }

    */
   class User implements Human, History {
       history: HistoryEntry[] = [];
       name: string;
       surname: string;
       age: number;

       constructor(name: string, surname: string, age: number) {
            this.name = name;
            this.surname = surname;
            this.age = age;
       }

       showHistory(): void {
           console.log(this.history);
           
       }

       addHistory(entry: HistoryEntry): void {
           this.history.push(entry);
       }
   }

   const person = new User("JJJ", "Kkkk", 100);
   person.showHistory();
   person.addHistory({
       createdAt: new Date,
       event: 'Zalogowano',
   })
   person.showHistory();
}

//program7();

/*
Jedna klasa dziedziczy z drugiej klasy, która ma zaimplementowany interfejs
*/

function program8() {
    interface MyInterface {}

    class A implements MyInterface {}

    class B extends A {}

    // Powyższe zadziała, B nie wymaga implementacji interfejsu. 
    // Możemy go jednak dodatkowo zaimplementować także w B. 
}