/*
Skorzystamy ze wzorców:
- active record
- repository
*/

const { pool } = require("./utils/db");
const {TodoRecord} = require("./records/todo/record");
(async () => {

    const firstTodoItem = new TodoRecord({
        title: 'bbb 2',
    });
    const newId = await firstTodoItem.insert();
    console.log(`New todo added with ID ${newId}`);
    await pool.end();
})()