/*
Podstawowe typy zmiennych
*/

//##Typy proste
const text: string = "A kuku";
const color: 'Bialy' | "Żółty" | "Zielony" = "Bialy";
const numberA: 1 | 2 | 3 = 3;
const bool: boolean = true;
const count: number = 125; 
const count2: Number = 123; //deklarujemy, że to obiekt typu Number, js przekształca do niego 123 i wszystko jest ok teoretycznie. 
const count3: number = new Number(123); // tutaj już błąd, bo TS chce dostać typ prosty będący liczbą. 

//##Tablice
const foobar: Array<string> = ['abc', 'bbb', 'ddd']; //typ generyczny - typ mający w sobie inny typ. 
const foobar2: Array<any> = ['abc', 123, true]; 
const foobar3: Array<string | number | boolean> = ['abc', 123, true]; 

//Pamiętamy, że TS pokazuje nam błędy przy pisaniu kodu, ale przy wykonywaniu już nie (jeżeli w JS wszystko jest ok)

const num = JSON.parse('123');
foobar.push(num); 

/* W powyższym TS się nie zorientuje, że będzie błąd.
Tak może być także z api i danymi z netu. 
W takim przypadku musimy obsługę zrobić ręcznie

if (typeof num !== "string") {
    throw new Error("Invalid data type. String expected")
}
*/

const foobar4:string[] = ['abc', 'bbb', 'zzz'];  //skrót do pisania tablic. Najpopularniejszy sposób pisania tablic
const foobar5:number | string[] = ['abc', 2, 3, 'bbb', 'zzz'];  //tak już nie wejdzie bo ma to być number lub tablica stringów
const foobar51: (number | string)[] = ['abc', 2, 3, 'bbb', 'zzz'];  //tak już nie wejdzie bo ma to być number lub tablica stringów
const foobar52: [string, number, number, string, string] = ['abc', 2, 3, 'bbb', 'zzz'];  //tak już nie wejdzie bo ma to być number lub tablica stringów

//##Enum(wyliczenie) - pozwala wypiusać pewne rzeczy. Enum to nie jest JS tylko TS. 
const bartekUserRole = "Admin"; 
const kubaUserRole = "Administrator"; 
const xyzUserRole = "admin";

enum UserRole {
    Admin,
    User,
    BannedUser,
}

const bartekUserRole2 = UserRole.Admin; //To nas pięknie przypilnuje

enum TaskPriority {
    Low, 
    Normal,
    High,
    Critical,
}

const abc: TaskPriority = TaskPriority.High

const task = {
    name: "Do something",
    priority: TaskPriority.Normal,
}

//##Any
const drink: any = 123;

//##Void
//np dla funkcji która nic nie zwraca
function logSum (a: number,b: number): void {
    console.log(a + b);
}

function procedure(): void {
    console.log("Hello, World");
}

//##Null & undefined
const foobar6: null = null;
const foobar61: number | null = null;

const foobar7: undefined = undefined;