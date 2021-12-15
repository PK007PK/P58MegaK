//Active Record - sposób na robienie takich rekordów
//w sposób aktywny

const { pool } = require("../../utils/db");
const {v4: uuid} = require('uuid');
class TodoRecord {
    constructor(obj) {
        if (obj.title.trim() < 5) {
            throw new Error('To do title should be at last 5 characters.')
        }

        if (obj.title.length > 150) {
            throw new Error('To do title should be at most 150 characters.')
        }
        this.id = obj.id;
        this.title = obj.title;
    }

    async insert() {
        this.id = this.id ?? uuid(); //null or undefined
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title)', {
            id: this.id,
            title: this.title,
        });
        return this.id;
    }

    async delete() {
        if(!this.id) {
            throw new Error('Todo has no ID!');
        }

        await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
            id: this.id,
        })
    }

    /*
        Tworzymy metodę statyczną, która operuje na całej klasie,
        nie na pojedynczym rekordzie. Metoda statyczna nie 
        ma wcale dostępu do this poszczególnych obiektów.

        Jeżeli robimy return w metodzie async to await można pominąć.
    */
    static async find(id) {
        const [results] = await pool.execute('SELECT * from `todos` WHERE `id` = :id', {
            id,
        })
        //To jest ważne, bo po tym jak go znajdzie dzięki temu że jest to
        //instancja może skorzystać z jego metod. 
        return new TodoRecord(results[0]);
    }
}

module.exports = {
    TodoRecord,
}