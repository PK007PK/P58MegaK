/*
Teoria. 
Własne typy. 
*/

function program1() {
    const abc: number | string = "Aaa";
    const def: number | string = 453;

    function sum(a: number | string, b: number | string) {
        //return a + b; pokazuje błąd, musimy mu powiedzieć o co chodzi
        return (a as string) + (b as string);
    }
}

// Upraszczamy definiując typ

function program2() {
    type NumOrString = number | string; //Wielka litera jest tylko konwencją. 

    const abc: NumOrString = "Aaa";
    const def: NumOrString = 453;

    function sum(a: NumOrString, b: NumOrString) {
        return (a as string) + (b as string);
    }
}

/* 
Podstawowa Klasa w TS:
*/
function program3() {
    class Human {
        name: string;
        surname: string;

        constructor(name: string, surname: string) {
            this.name = name;
            this.surname = surname;
        }
    }

    /* 
    Uwaga, klasa również jest typem. 
    Mając klasę nie koniecznie musimy robić interfejs. 
    */

    function greet(person: Human) {
        console.log(person.name);
    }
}

/*
Super działa jak w es6
*/

function program4() {
    
    class Animal {
        specie: string;
        constructor(specie: string) {
            this.specie = specie;
        }
    }

    class Human extends Animal {
        name: string; // deklarowanie pól
        surname: string;
        lifeEvents: string[] = []; //Tu typ trzeba napisać, bo TS nie wie czego to jest tablica. 
        isAlive = true; // Tu by nie robił, bo TS się tego domyśli, bo to jasno wynika z kontekstu (bo przypisane true)
        //Przez to że daliśmy domyślnie true, to nie pozostaje wątpliwości, że to jest boolean. 
        countryOfBirth = "Poland"; // Tu tak samo

        constructor(name: string, surname: string) {
            super('human');
            this.name = name;
            this.surname = surname;
        }
    }

    /* 
    Uwaga, klasa również jest typem. 
    Mając klasę nie koniecznie musimy robić interfejs. 
    */

    function greet(person: Human) {
        console.log(person.name);
    }
}

/*

*/

function program5() {

    class Xyz {
        // history = [];
        history: string[];

        constructor() {
            this.history = [];
        }
    }

}

/*
Automatyczne deklarowanie i przekazywanie pól z konstruktora
Docelowe pisanie klasy w TS. 
*/

function program6() {

    class Human {
        
        constructor(public name: string, public surname: string) { // i cała reszta tak jak powyżej dzieje się automatycznie. 
        } //Modyfikatory dostępu to właśnie te publiki
    }

    function foobar(person: Human) {
        //I nic się nie zmienia. TS nadal wszystko wie. Tak jak było wcześniej. 
    }
}

/*
    To co powyżej, ale na bardziej skomplikowanym przykładzie
*/

function program7() {
    
    class Animal {
        constructor(public specie: string) {}
    }

    class Human extends Animal {
        lifeEvents: string[] = [];  
        isAlive = true; 

        constructor(
            public name: string,  
            public surname: string
        ) {
            super('human');
        }
    }

    /* 
    Uwaga, klasa również jest typem. 
    Mając klasę nie koniecznie musimy robić interfejs. 
    */

    function greet(person: Human) {
        console.log(person.name);
    }
}

/*
    Readonly, czyste klasy
    Jest wiele zapisów, które od zewnątrz nie powinny być zmieniane. 
*/

function program8() {

    class Animal {
        constructor(public readonly specie: string) {}
    }

    class Human extends Animal {
        lifeEvents: string[] = [];  // tu też możemy readonly, ale to nie ma sensu w tym przykładzie. 
        // Readonly działa jak const, więc np tablicę możemy pushować. 
        isAlive = true; 

        constructor(
            public readonly name: string,  
            public readonly surname: string
        ) {
            super('human');
        }
    }

    const bartek = new Human('Bartek', "B.");
    bartek.name = "AAA"; // Błąd bo readonly
}