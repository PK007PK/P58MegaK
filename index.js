/*
Skorzystamy ze wzorców:
- active record
- repository
*/

const { pool } = require("./utils/db");
const {TodoRecord} = require("./records/todo.record");
const { TodoRepository } = require("./repositories/todo.repository");

(async () => {
    const foundTodo = await TodoRepository.find('7508a026-35f4-401b-8c18-daea02835a05');
    console.log(foundTodo);
    const allRecords = await TodoRepository.findAll();
    console.log(allRecords);
})()