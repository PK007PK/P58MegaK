const {readFile, readdir, stat} = require('fs').promises;

async function readFilesAndDirectories() {
    const fileNames = await readdir('./data', {
        withFileTypes: true,
    });

    for (const {name: fileName} of fileNames) {
        const fileContent = await readFile(`./data/${fileName}`, 'utf8');
        console.log(fileContent);
        const fileStat = await stat(`./data/${fileName}`);
        console.log(fileStat.isFile());
    }
}

readFilesAndDirectories();