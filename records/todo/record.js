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
}

module.exports = {
    TodoRecord,
}