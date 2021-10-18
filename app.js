const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const { calcRouter } = require('./routes/calc');
function program1() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/calc', calcRouter);
    app.listen(3000);
}
program1()
