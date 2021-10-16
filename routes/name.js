const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const nameRouter = express.Router();
const FILE_NAME = './data/name.txt'

nameRouter.get('/set/:name', async (req,res)=>{
    const name = req.params.name;
    await writeFile(FILE_NAME, name, 'utf8')
    res.send(name);
})
.get('/show', async (req,res)=>{
    const name = await readFile(FILE_NAME, 'utf8');
    res.send(name);
})
.get('/check', async (req,res)=>{
    try {
        await readFile(FILE_NAME, 'utf8');
        res.send("There is a name saved");
    } catch(e) {
        console.log(e);
        res.send("There is no name");
    }
    
})

module.exports = {
    nameRouter,
}