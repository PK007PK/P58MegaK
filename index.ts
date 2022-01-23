/*
#Zadania CD
Poniżej przykład z urzyciem klasy jako typu. 
*/

function excercise3(): void {

    class User {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    const json = '{"name": "Jan"}';
    const {name} = JSON.parse(json) as User; // tu ważne!!!!!!!!!!!!!!
    let user: string | User = name === "" ? "" : `User ${name}`;

    if (user !== "") {
        user = new User(user);
    }

    console.log(user);
}

/*
Z3 
*/

function ex3(): void {
    // interface CorrentType {
    //     a: number | string;
    //     b?: number | string;
    //     sign?: "+" | "-" | "*" | "/";
    // };

    type Sign = "+" | "-" | "*" | "/";

    interface CorrentType {
        a: number | string;
        b?: number | string;
        sign?: Sign;
    };

    const a: CorrentType = {
        a: 1,
        b: 2,
        sign: "+",
    };

    const b: CorrentType = {
        a: 1,
        b: 2,
    };

    const c: CorrentType = {
        a: '1',
        b: '2',
        sign: "-",
    };

    const d: CorrentType = {
        a: 1,
        sign: '+',
    }
}

//Zmieniamy program tak, żeby kiedy mamy a i b to dopuszczalne są inne operacje niż kiedy mamy tylko a

function ex31(): void {

    type TwoNumbersSign = "+" | "-" | "*" | "/";

    interface TwoNumbersOperation {
        a: number | string;
        b: number | string;
        sign?: TwoNumbersSign;
    }

    type OneNumberSign = "++" | "--";

    interface OneNumbersOperation {
        a: number | string;
        sign?: OneNumberSign;
    }

    type CorrentType = TwoNumbersOperation | OneNumbersOperation;

    const a: CorrentType = {
        a: 1,
        b: 2,
        sign: "+",
    };

    const b: CorrentType = {
        a: 1,
        b: 2,
    };

    const c: CorrentType = {
        a: '1',
        b: '2',
        sign: "-",
    };

    const d: CorrentType = {
        a: 1,
        sign: '++',
    }

    //tylko a, więc ++ wchodzi, + nie wchodzi. 
    const e: CorrentType = {
        a: 10, 
        sign: "++"
    }
}

//Zmieniamy program tak, aby to operacji używać enumów a nie stringów. 

function ex32(): void {

    enum TwoNumbersSign {  //Enum to też jest typ
        Add, 
        Subtract,
        Plus,
        Minus, 
        Multiply, 
        Divide, 
    }

    interface TwoNumbersOperation {
        a: number | string;
        b: number | string;
        sign?: TwoNumbersSign;
    }

    enum OneNumberSign {
        Inc,
        Dec,
    }

    interface OneNumbersOperation {
        a: number | string;
        sign?: OneNumberSign;
    }

    type CorrentType = TwoNumbersOperation | OneNumbersOperation;

    const a: CorrentType = {
        a: 1,
        b: 2,
        sign: TwoNumbersSign.Add,
    };

    const b: CorrentType = {
        a: 1,
        b: 2,
    };

    const c: CorrentType = {
        a: '1',
        b: '2',
        sign: TwoNumbersSign.Subtract
    };

    const d: CorrentType = {
        a: 1,
        sign: OneNumberSign.Inc,
    }

    //tylko a, więc ++ wchodzi, + nie wchodzi. 
    const e: CorrentType = {
        a: 10, 
        sign: OneNumberSign.Inc,
    }

    //Przykładowe wykorzystanie enumów
    function calc({a,b,sign}: TwoNumbersOperation): void {
        if (sign === TwoNumbersSign.Add) {
            console.log(Number(a) + Number(b));
            
        }
        else if (sign === TwoNumbersSign.Subtract) {}

        //Pięknie działa ze SWITCHEM
        switch(sign) {
            case TwoNumbersSign.Add:
                console.log(Number(a) + Number(b));
            break;
            case TwoNumbersSign.Subtract:
                console.log(Number(a) - Number(b));
            break;
        }
    }
}

/*
Z4 
*/


function ex4(): void {

    interface Product {
        name: string;
        count: number;
        isDegradable: boolean;
    }

    const product: Product = {
        name: 'Opakowanie zbiorcze',
        count: 1000,
        isDegradable: true,
    };

    // function getProductProp(obj: Product, propName: "name" | "count" | "degradable"): string | number | boolean {
    //     return obj[propName]
    // }

    //keyOf to typescriptowy operator
    function getProductProp(obj: Product, propName: keyof Product): string | number | boolean {
        return obj[propName]
    }

    const count = getProductProp(product, 'count') as number;
    const degraded = getProductProp(product, "isDegradable") as boolean;
    console.log(`${count.toFixed(2)} ${degraded ? "degraded" : "undegraded"}`);
}