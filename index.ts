/*
#Gettery i settery
W normalnym JS też istnieją gettery i settery
G i S działają także w JS, ale tam zamiast modyfikatorów dostępu
musimy dawać # aby oznaczyć właściwość jako prywatną. 
*/

function program1() {
    class Animal {
        constructor(
            protected readonly specieName: string
            // public readonly specieName: string
            // private readonly specieName: string
        ) {}
    }

    class Human extends Animal {
        private readonly lifeEventsList: string[] = [];
        private isAlive = true;

        constructor(
            private readonly name: string,
            private readonly surname: string,
        ) {
            super('Human');
        }

        addLifeEvents(eventName: string): void {
            this.lifeEventsList.push(eventName);
        }

        /*
        W klasie getter działa jak metoda. Z punkty widzenia kodu jednak
        korzystamy z tego jak by to była właściwość. Ukrywamy wszystko co przetrzymujemy
        w środku, na zewnątrz wystawiamy tylko api. 
        */
        get lifeEvents(): string[] { //daliśmy spację po get i powstał getter
            return this.lifeEventsList.filter(s => s !== 'Kompromitacja');
        }

        //Robimy setera, ale to nie jest najlepszy przykład
        set lifeEvents(newEventsList: string[]) {
            this.lifeEventsList = newEventsList; //gdybyśmy chcieli żeby to zadziałało 
            //to trzeba by readonly zlikwidować. Ogólnie konstrukcja taka, tylko przykład trochę zły
        }

        //Lepszy przykład: 
        get alive(): boolean {
            return this.isAlive;
        }

        set alive(newIsAlive: boolean) {
            if (!this.isAlive && newIsAlive) {
                throw new Error('You are not God!');
            }
            this.isAlive = newIsAlive;
        }
    }

    const bartek = new Human('Bartek', 'B');
    bartek.addLifeEvents("urodziny");
    bartek.addLifeEvents("kompromitacja");
    bartek.addLifeEvents("nowa praca");
    console.log(bartek.lifeEvents); //Tu korzystamy z gettera - bez wywołania funkcji

    for (const event of bartek.lifeEvents) {
        console.log(event); // Możemy przejechać pętlą po geterze
    }

    bartek.lifeEvents.push("Abbbbaaaa"); // Tak się nie powinno robić. Przez przypadek to działa niestety. 
    /*
    To jest brzydkie ogólnie. Robiąc filter robi nam się nowa tablica na podstawie tamtej, i przez referencję
    to przypadkiem działa, pomimo że wcale nie chcemy żeby to działało. 

    Aby shackować to shackowanie możemy zmienić to jakoś tak:
    get LifeEvents(): string[] { //daliśmy spację po get i powstał getter
            return [...this.lifeEventsList.filter(s => s !== 'Kompromitacja')];
        }

    i już dane źródłowe nie zostaną uszkodzone
    */

   bartek.lifeEvents = []; //Tu już sygnalizuje błąd

   bartek.alive;
//    bartek.alive = false;

    const adolf = new Human("Adolf", "H");
    console.log(adolf.alive); //true
    adolf.alive = false; //spoko, zmienia
    console.log(adolf.alive); //false
    adolf.alive = true; //wywala już błąd. 
}

/*
#Klasy abstrakcyjne. 
*/


function program2() {
    class Animal {
        constructor(
            protected readonly specieName: string
        ) {}
    }

    const duck = new Animal('duck'); // Tego chcemy zabronić. Do tego ma powstać taka sama klasa jak Human:

    abstract class Animal2 {
        constructor(
            protected readonly specieName: string
        ) {}
    }

    const duck2 = new Animal2('duck'); //Zwraca błąd bład. Klasa abstrakcyjna nie jest do tworzenia czegoś
    // Tylko do wykorzystania w innych klasach

    class Human extends Animal2 {
        private readonly lifeEventsList: string[] = [];
        private isAlive = true;

        constructor(
            private readonly name: string,
            private readonly surname: string,
        ) {
            super('Human');
        }

        addLifeEvents(eventName: string): void {
            this.lifeEventsList.push(eventName);
        }

        get lifeEvents(): string[] { //daliśmy spację po get i powstał getter
            return this.lifeEventsList.filter(s => s !== 'Kompromitacja');
        }
    }
}

/*
#Typy generyczne
To takie typy, które mogą mieć subtyp.
*/

function program3() {

    async function getTodo(id: number) {
        const resp = await fetch(`https://jsonplaceholder.pypicode.com/todos/${id}`);
        return await resp.json();
    }

    (async () => {
        const todo = await getTodo(10) //typ generyczny: Promise<any> . Typ który ma subtyp.
        //tak jak const ar: Array<number> = [1,2,3] 
        // todo. i nic nam tu nie podpowie , TS nie wie. 
    })()
}

/*
Ulepszamy wykorzystując możliwości TS
Wszystkie asynchroniczne zwracają typ promise
const a = async (): string => {} // błąd z automatu
*/

function program4() {

    interface SingleTodo {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
        // name: string; Jak dodamy name to nie dostaniemy błędu, 
        //bo okaże się to dopiero w trakcie wywoływania, że nie ma name.
        //A TS pomaga nam w trakcie pisania. 
        //Dlatego dobrym rozwiązaniem jest stosować te same interfejsy i na froncie i na backendzie
    }

    async function getTodo(id: number): Promise<SingleTodo> {
        const resp = await fetch(`https://jsonplaceholder.pypicode.com/todos/${id}`);
        return await resp.json();
    }

    (async () => {
        const todo = await getTodo(10);
        //Daliśmy interfejs, więc podpowiedzi już działają po kropeczce: todo.xxx
    })()
}

