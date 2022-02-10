import {ValidationError} from '../utils/errors'

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: WarriorRecord) { //W ten sposób constructor przyjmie to co powyżej wypisane
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

    async insert() {}
    async update() {}
    static async getOne(id: string) {}
    static async listAll() {}
    static async listTop(topCount: number) {}
}