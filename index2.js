const { readdir } = require('fs').promises;

function program10() {
    async function readFilesAndDirectories() {
        const list = await readdir('.');
        return list;
    }

    const abc = readFilesAndDirectories();
    console.log(abc);
}
program10();