import {createPool} from "mysql2/promise";

//tworzymy pulę połączeń
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_arena',
    namedPlaceholders: true, //To po to aby z ładnych zmiennych w mysqlu korzystać. 
    decimalNumbers: true, //aby liczby zmiennoprzecinkowe były liczbami a nie stringami
});
