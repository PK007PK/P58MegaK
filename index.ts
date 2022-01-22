/*
Modyfikatory dostępu. 
public / private / protected
*/

function program1() {
    
    class Pc {
        // isOn = false; // Jeżeli nic tu nie wpisujemy to jest to domyślnie public. 
        public isOn = false; //Public czyli każdy może robić z tym co chce. 
        constructor( 
            public cpu: string,
            public ram: number, //Jak to ma nam automatycznie stworzyć deklarację 
        ) {}
        on() {
            console.log("Loading BIOS...");
            if (!this.cpu) {
                throw new Error('CPU is lacking');
            }
            this.isOn = true;
        }
    }

    const myPc = new Pc('486SX', 256);
    myPc.on();
    console.log(myPc);
}

// Nie chcemy żeby ktoś mógł zrobić myPc.isOn = true; to ma być robione tylko
// metodą, interfejsem. Do tego służy private

function program2() {
    
    class Pc {
        private isOn = false; 
        constructor(
            public cpu: string, // tu też da się wstawić private, chociaż cięzko znaleźć uzasadnienie
            public ram: number,
        ) {}
        on() {
            console.log("Loading BIOS...");
            if (!this.cpu) {
                throw new Error('CPU is lacking');
            }
            this.isOn = true;
        }
    }

    const myPc = new Pc('486SX', 256);
    myPc.isOn = false; // Teraz wyskoczy błąd. Bo dobieramy się z zewnątrz do klasy która jest private
    myPc.on();
    console.log(myPc);
}

//Jednak chcemy, aby w konstruktorze były private i budujemy uzasadnienie. 

function program3() {
    
    class Pc {
        private isOn = false; 
        constructor(
            private cpu: string, 
            private ram: number,
        ) {}
        
        on() {
            console.log("Loading BIOS...");
            if (!this.cpu) {
                throw new Error('CPU is lacking');
            }
            this.isOn = true;
        }

        changeCpu(newCpu: string): void {
            if (newCpu === "") {
                throw new Error('CPU is required')
            };

            this.cpu = newCpu;
        }
    }

    const myPc = new Pc('486SX', 256);
    // myPc.cpu = "sss" błąd i nie podpowiada takiej opcji.
    myPc.changeCpu('Athlon'); //Pięknie. 

    console.log(myPc);

}

/*
Private a protected. 
Protected od private różni się tym, że 
*/

function program4() {
    class Animal {
        constructor(
            protected readonly specieName: string
            // public readonly specieName: string
            // private readonly specieName: string
        ) {}
    }

    class Human extends Animal {
        private readonly lifeEvents: string[] = [];
        private isAlive = true;

        constructor(
            public readonly name: string,
            public readonly surname: string,
        ) {
            super('Human');
        }

        addLifeEvents(eventName: string): void {
            this.lifeEvents.push(eventName);
        }

        getLifeEvents(): string[] {
            return this.lifeEvents.filter(s => s !== 'Kompromitacja');
        }

        foobar(): string {
            return this.specieName; // Jeżeli w animal private to błąd, jeżeli public to ok. Jeżeli protected to też ok tutaj
        }
    }

    const bartek = new Human('Bartek', 'B');
    bartek.addLifeEvents.push("Zgon"); // Błąd bo private
    bartek.addLifeEvents("urodziny");
    bartek.addLifeEvents("kompromitacja");
    bartek.addLifeEvents("nowa praca");
    console.log(bartek.lifeEvents); //Błąd bo private
    console.log(bartek.specieName); //Błąd bo private lub protected
    console.log(bartek.getLifeEvents()); //Też powinien być błąd, ale przy mojej konfiguracji nie ma. 
}


/*
Metody też mogą mieć modyfikatory dostępu
Wcześniej w czystym js chcąc mieć prywatne metody dawaliśmy podkreślnik _ . 
Była to wyłącznie konwencja. Teraz dla metod możemy ustawiać modyfikatory dostęu. 
*/

function program5() {
    class Animal {
        constructor(
            protected readonly specieName: string
            // public readonly specieName: string
            // private readonly specieName: string
        ) {}
    }

    class Human extends Animal {
        private readonly lifeEvents: string[] = [];
        private isAlive = true;

        constructor(
            public readonly name: string,
            public readonly surname: string,
        ) {
            super('Human');
        }

        addLifeEvents(eventName: string): void {
            this.lifeEvents.push(eventName);
            this.checkPulse(); // Tutaj możemy z tegp
        }

        getLifeEvents(): string[] {
            return this.lifeEvents.filter(s => s !== 'Kompromitacja');
        }

        private checkPulse(): string {
            if (!this.isAlive) {
                return "Is dead"
            } else {
                return "Is alife"
            }
        }
    }

    const bartek = new Human('Bartek', 'B');
    bartek.addLifeEvents.push("Zgon"); // Błąd bo private
    bartek.addLifeEvents("urodziny");
    bartek.addLifeEvents("kompromitacja");
    bartek.addLifeEvents("nowa praca");
    console.log(bartek.lifeEvents); //Błąd bo private
    console.log(bartek.specieName); //Błąd bo private lub protected
    console.log(bartek.getLifeEvents()); //Też powinien być błąd, ale przy mojej konfiguracji nie ma. 
}

/*
Aktualnie w JS też istnieją pola prywatne oznaczane za pomocą znaku #
*/

class Xyz {
    #history = [];

    addHistoryEntry(entry) {
        this.#history.push(entry)
        this.#fooBar();
    }

    #fooBar() {}
}