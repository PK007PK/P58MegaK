const {join, basename, dirname, extname, normalize, resolve} = require('path');
const { watch } = require('chokidar');
const { readFile } = require('fs').promises;
/*
    Śledzenie plików z chokidar . Nie ma promisów. Mamy tu rzeczy które mogą się wykonać wielokrotnie. Dlatego
    Nie nadaje się to do promisów.
 */



function program1() {
    watch('.');
}

//program1()

function program2() {
    watch('.').on('all',(event,path)=>{console.log(event,path)})
}
//program2()


/*
Można używać globów
Glob na wszystkie podfoldery i pliki to kropka slash gwiazdka gwiazdka slash gwiazdka kropka
Glob na wszystkie podfoldery i pliki js to kropka slash gwiazdka gwiazdka slash gwiazdka kropka js
*/

function program3() {
    watch('./**/*.').on('all',(event,path)=>{console.log(event,path)})
}
//program3()

function program4() {
    watch('./**/*')
        .on('add',(path)=>console.log(`File ${path} has been added`))

}
//program4()

/*
Tricki związane z chokidarem

pooling. Domyślnie jest wyłączony, gdyż jest mało wydajny.
Natomiast jeżeli obserwujesz jakieś nioetypowe zmiany, np w lokalizachach zdalnych,
wtedy warto zastanowić się nad użyciem usePooling: true

Pojawiają się sytuacje, jak np zdalny folder ftp - kiedy zapis nie jest natychmiastowy,
a my chcemy używać chokidar by wiedzieć jaka jest zawartość pliku.

Wtedy warto użyć flagi: awaitWriteFinish: true;

W skrócie spowoduje ona oczekiwanie na to aż plik zostanie zapisany w całości (na tyle na ile to możliwe),
zanim wyemituje zdarzenie add czy change.

ignoreInitial: true - spowoduje, że nie dostaniemy tej całej wyliczanki na początku
 */

function program5() {
    watch('.', {
        awaitWriteFinish: true,
        ignoreInitial: true,
    })
        .on('add',(path)=>{console.log(`File ${path} has been added`)})
}
//program5()

async function programZadanie() {
    function safeJoin(base, target) {
        const targetPath = '.' + normalize('/'+target);
        return resolve(base, targetPath);
    }

    const userPath = `${safeJoin(__dirname, process.argv[2])}\\*.js`;
    console.log("Watching path:", userPath);
    watch(userPath, {
        awaitWriteFinish: true,
        ignoreInitial: true,
    })
        .on('add',path => {
            console.log(`File ${path} has been added`);
            (async() => {
                try {
                    console.log(`${path} content: `);
                    const file = await readFile(path, 'utf8');
                    console.log(file);
                } catch(e) {
                    console.log(e);
                }
            })()
        })
        .on('change', path => {
            console.log(`File ${path} has been changed`);
            (async() => {
                try {
                    console.log(`${path} content: `);
                    const file = await readFile(path, 'utf8');
                    console.log(file);
                } catch(e) {
                    console.log(e);
                }
            })()
        })
        .on('unlink', path => console.log(`File ${path} has been deleted`))
}

programZadanie()