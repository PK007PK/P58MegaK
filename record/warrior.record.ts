import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { pool } from '../utils/db';

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) { //W ten sposób constructor przyjmie to co powyżej wypisane
        //omit, exclude podobnie jak pick to utility types. Exclude: weź WR i wyklucz z niego....

        const {id, stamina, defence, agility, power, name, wins} = obj;
        //imienia z bazy nie sprawdzimy tutaj, bo konstruktor nie może być asynchroniczny;
        const sum = [stamina, defence, agility, power].reduce((prev, curr) => prev + curr, 0);
        if (sum !==10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10.
            Aktualnie jest to ${sum}`);
        }

        if (name.length < 3 && name.length > 50 ) {
            throw new ValidationError(`Nazwa wojownika musi mieć więcej niż 3, a mniej niż 50 znaków.
            Aktualnie jest to ${name.length}`);
        }

        this.id = id;
        this.stamina = stamina;
        this.defence = defence;
        this.agility = agility;
        this.power = power;
        this.name = name;
        this.wins = wins;
    }

    //Warto aby insert zwracał ID, w wielu sytuachach się to przydaje. 
    //Tworzymy woja, i od razu chcemy wiedzieć jaki mu się ID stworzył. 
    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        if (typeof this.wins !== "number") {
            this.wins = 0;
        }


        /*
        await pool.execute("INSERT INTO 'warriors'('id', 'name', 'power', 'defence', 'stamina', 'agility', 'wins') VALUES(:id, :name, :power, :defence, :stamina, :agility, :wins)", {
            this //ten this jest zamiast id: this.id ..itd itp dla wszystkich. 
        }); ale to niebezpieczne, bo jak ktoś nam przez przypadek rozszerzy klasę o coś, czego 
        mysql nie łyknie to się wszystko wykrzaczy. Czyli ręcznie jednak lepiej. Podobno istnieje jeszcze lepszy sposób. 
        */
        await pool.execute("INSERT INTO 'warriors'('id', 'name', 'power', 'defence', 'stamina', 'agility', 'wins') VALUES(:id, :name, :power, :defence, :stamina, :agility, :wins)", {
            id: this.id,
            name: this.name,
            power: this.power,
            defence: this.defence,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
        });
    }

    async update(): Promise<void> {}

    static async getOne(id: string): Promise<WarriorRecord | null> {}

    //Nie dajemy WarriorRecord | null, bo funkcja będzie działała inaczej
    //Zwróci tablicę WR lub pustą tablicę. 

    static async listAll(): Promise<WarriorRecord[]> {}

    static async listTop(topCount: number): Promise<WarriorRecord[]> {}

}