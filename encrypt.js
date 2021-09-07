const { readFile, writeFile } = require('fs').promises;
const { encryptText } = require('./cipher');

function program1() {
    const [,,fileName, pwd] = process.argv;

    (async () => {
        const content = await readFile(fileName, 'utf8');
        console.log(content)
    })();
}


program1();