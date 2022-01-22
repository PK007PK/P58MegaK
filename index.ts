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
    class Human {
        private readonly lifeEvents: string[] = [];
        private isAlive = true;

        constructor(
            public readonly name: string,
            public readonly surname: string,
        ) {}

        addLifeEvents(eventName: string) {
            this.lifeEvents.push(eventName);
        }
    }

    const bartek = new Human('Bartek', 'B');
    console.log(bartek.addLifeEvents); //
    bartek.addLifeEvents.push("Zgon"); // Błąd bo private
    bartek.addLifeEvents("urodziny");
}