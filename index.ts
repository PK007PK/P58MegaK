/*
Export, default export
require to common js. 

Export i import problematyczne w common js od zawsze wspierany jest w TS.
*/

enum Gender {
    Woman,
    Man,
    Xyz,
}

console.log(Gender[Gender.Woman]);
