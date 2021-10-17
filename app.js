const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const { voteRouter } = require('./routes/vote');
function program1() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/vote', voteRouter);
    app.listen(3000);
}
program1()
