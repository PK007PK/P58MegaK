/*
Zadanie. Sprawdzamy jaki rodzaj kodu wykonuje się najszybciej. 
*/

class Test {
    push() {
        console.log("Testing push...");
        const ar = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar.push(i);
        }
        const end = + new Date();
        console.log(`Push. It took ${end - start} ms.`);
        
    }

    desc() {
        console.log("Testing push...");
        let ar: number[] = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar = [...ar, i];
        }
        const end = + new Date();
        console.log(`Desc. It took ${end - start} ms.`);
    }

    last() {
        console.log("Testing push...");
        let ar: number[] = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar[ar.length] = i;
        }
        const end = + new Date();
        console.log(`Last. It took ${end - start} ms.`);
    }
}

const testSuite = new Test();
// testSuite.push();
// testSuite.desc();
// testSuite.last();

/*
Dekoratory
Rozbudować config o:
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
Mało prawdopodobne, abym w najbliższej przyszłości potrzebował dekoratora. 
Dekoratory, to takie kawałki kodu, które rozszerzają działanie jednej z trzech rzeczy: 
całej klasy, metody, właściwości. 
Rozpoznajemy je po małpce. 
@Decorator()
Zastosowanie dekoratorów wygląda jak poniżej.
Nie pokazują jak je robić, bo jest to skompikowane w samym js/ts
*/


class Test2{
    @measureTime();
    @description('array.push()');
    push() {
        const ar = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar.push(i);
        }
        const end = + new Date();       
    }

    @measureTime();
    @description('array.desc()');
    desc() {
        let ar: number[] = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar = [...ar, i];
        }
        const end = + new Date();
    }

    @measureTime();
    @description('array.last()');
    last() {
        let ar: number[] = [];
        const start = + new Date();
        for (let i = 0; i < 100000; i++) {
            ar[ar.length] = i;
        }
        const end = + new Date();
    }
}

//Zadanie
// Zróbmy możliwość zmiany name na Kuba lub Bartek, ale inaczej nie.
// TaK samo gender: man lub woman

function program1() {
    class Test3 {
        constructor(public name: string, public gender: string) {}
    }

    const foobar = new Test3("bartek");
    foobar.name = "Kuba"; 
    console.log(foobar.name);
}

//Rozwiązanie

function program3() {
    type Names = "bartek" | "kuba";
    type Gender = "man" | "woman";

    class Test3 {
        constructor(private userName: Names, private userGender: Gender) {}

        get name(): Names {
            return this.userName;
        }

        set name(newName: Names) {
            if (!['bartek', 'kuba'].includes(newName)) {
                throw new Error("Name must be bartek or kuba");
            }
            this.userName = newName; 
        }
    }

    const foobar = new Test3("bartek", "man");
    foobar.name = "kuba"; 
    console.log(foobar.name);
}

//Z dekoratorami tak:
class Test100 {
    @allowListOnly(['bartek', 'kuba'])
    name: string = "bartek";

    @allowListOnly(['man', 'woman']
    gender: string = 'man';
}