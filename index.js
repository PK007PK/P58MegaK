const {readFile, writeFile, appendFile, readdir, stat} = require('fs').promises;

function program1() {
    async function readFilesAndDirectories() {
        const fileNames = await readdir('./data', {
            withFileTypes: true,
        });

        for (const {name: fileName} of fileNames) {
            const fileContent = await readFile(`./data/${fileName}`, 'utf8');
            console.log(fileContent);
            const fileStat = await stat(`./data/${fileName}`);
            console.log(fileStat);
            console.log(fileStat.isFile());
        }
    }
    readFilesAndDirectories();
}
// program1()

function program2() {
    const SOURCE_FILE_NAME = './data/input1.json';
    const DESTINATION_FILE_NAME = './data/sum.txt';

    (async () => {
        try {
            const data = JSON.parse(await readFile(SOURCE_FILE_NAME, 'utf8')).map(item=>Number(item)).reduce((a,b) => a+b);
            await appendFile(DESTINATION_FILE_NAME, JSON.stringify(data), 'utf8');
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}
//program2()

function program3() {
    const BASE_DIR = './';
    (async () => {
        try {
            const list = await readdir(BASE_DIR,  {
                withFileTypes: false,
            });
            console.log(list);
            for (const item of list) {
                const itemDirectory = `${BASE_DIR}${item}`
                const fileStat = await stat(itemDirectory);
                if (fileStat.isDirectory()) {

                };
            }
        } catch(err) {
            console.log('Oh no!', err)
        }
    })()
}
//program3()

async function program4() {
    const BASE_DIR = './';

    async function checkDir(dir) {
        const list = await readdir(dir);
        const improvedList = [];
        for (const item of list) {
            const fileStat = await stat(`${dir}${item}`);
            if (fileStat.isDirectory()) {
                improvedList.push({item, path: `${dir}${item}/`, type: "dir"})
            } else {
                improvedList.push({item, path: `${dir}${item}/`, type: "file"})
            }
        }
        return improvedList;
    }

    async function processData(data) {
        for (const {item, path, type} of data) {
            if (type === "dir") {
                console.log("*********** Checking directory:", path);
                await processData(await checkDir(path));
            } else {
                console.log(`File:`, item);
            }
        }
    }

    const testArr = await processData(await checkDir(BASE_DIR));
    console.log(testArr);
}

// program4()