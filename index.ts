//Z1
function pricify(
    price: number, 
    currency: string = "PLN", 
    vat: number = 0.23
    ): string {
        return `${(price * (1 + vat)).toFixed(2)} ${currency}`;
}
    
//W takich prostych sytuacjach jak poniżej nie musimy wypisywać typów, bo sam sobie zgadnie. 
function pricify2(
    price: number, 
    currency = "PLN", 
    vat = 0.23
): string {
    return `${(price * (1 + vat)).toFixed(2)} ${currency}`;
}

const arrowPrice = (
    price: number, 
    currency: string, 
    vat: number): string => `${(price * (1 + vat)).toFixed(2)} ${currency}`;

//Z2
interface PersonData {
    name: string;
    points: number;
}

//Możemy robić własne typy. 
type PersonAr = PersonData[];

const data: PersonAr = [
    {
        name: "Anna",
        points: 1000,
    },
    {
        name: "Krzysztof",
        points: 500,
    },
    {
        name: "Ola",
        points: 0,
    },
    {
        name: "Marek",
        points: 0,
    },
];

function incPoints(obj: PersonData): number {
    obj.points++;
    return obj.points;
}

function totalPoints(arr: PersonAr): number {
    return arr.reduce((prev,curr) => prev + curr.points, 0)
}

function personWithMostPoints(arr: PersonAr): PersonData {
    return arr.reduce((prev, curr) => {
        if (prev.points < curr.points) {
            return curr
        } else {
            return prev
        }
    })
}

function personWithMostPoints2(arr: PersonAr): PersonData {
    return arr.reduce((prev, curr) => prev.points < curr.points ? curr : prev)
}

function personWithMostPoints3(arr: PersonAr): PersonData {
    return arr.sort((a,b) => {
        if (a.points < b.points) {
            return -1;
        } else if (a.points > b.points) {
            return 1;
        } else {
            return 0
        }
    })[0];
}

function personWithMostPoints4(arr: PersonAr): PersonData {
    return arr.sort((a,b) => b.points - a.points)[0];
}

function personWithMostPoints5(arr: PersonAr): PersonData {
    return arr.sort((a,b) => b.points - a.points)[0] ?? null; //czyli jeżeli nie znajdzie dostaniemy undefined lub null to chcemy null
}

//Poniżej kolejna opcja poradzenia sobie z pustą tablicą
function personWithMostPoints6(arr: PersonAr): PersonData {
    if(arr.length === 0) {
        return null;
    }
    return arr.sort((a,b) => b.points - a.points)[0]; 
}