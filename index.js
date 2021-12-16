/*
Skorzystamy ze wzorców:
- active record
- repository
*/

const { pool } = require("./utils/db");
const {TodoRecord} = require("./records/todo/record");
(async () => {

    // const firstTodoItem = new TodoRecord({
    //     title: 'Znajdź mnie',
    // });
    // const newId = await firstTodoItem.insert();
    // console.log(`New todo added with ID ${newId}`);
    // await firstTodoItem.delete();
    const foundTodo = await TodoRecord.find('4ecad6d8-b82f-42db-8ff7-116b6d3ede27');
    console.log(foundTodo);
    await foundTodo.delete();
    await pool.end();
})()