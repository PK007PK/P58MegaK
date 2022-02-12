import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

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
        //Mówimy że konstruktorze oczekujemy Wr, ale bez ...

        const {id, stamina, defence, agility, power, name, wins} = obj;

        //imienia z bazy nie sprawdzimy tutaj, bo konstruktor nie może być asynchroniczny;
        
        const stats = [stamina, defence, agility, power]
        const sum = stats.reduce((prev, curr) => prev + curr, 0);

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError(`Każda ze statystyk musi wynosić minimum 1`);
            }
        }

        if (sum !==10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10.
            Aktualnie jest to ${sum}`);
        }

        if (name.length < 3 && name.length > 50 ) {
            throw new ValidationError(`Nazwa wojownika musi mieć więcej niż 3, a mniej niż 50 znaków.
            Aktualnie jest to ${name.length}`);
        }

        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.stamina = stamina;
        this.defence = defence;
        this.agility = agility;
        this.power = power;
        this.name = name;
    }

    //Warto aby insert zwracał ID, w wielu sytuachach się to przydaje. 
    //Tworzymy woja, i od razu chcemy wiedzieć jaki mu się ID stworzył. 
    async insert(): Promise<string> {
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

        return this.id
    }

    async update(): Promise<void> {
        await pool.execute("Update `warriors` SET `wins` = :wins", {
            wins: this.wins,
        })
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warrior` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;

        return results.length === 0 ? null : results[0];
    }

    //Poniżej nie dajemy WarriorRecord | null, bo funkcja będzie działała inaczej
    //Zwróci tablicę WR lub pustą tablicę. 

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warrior`") as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warrior` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount,
        }) as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

}