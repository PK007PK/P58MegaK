/*
    child_process ze szczególnym uwzględnieniem exec
    Pozwalający na wywołanie dowolnych procesów, programów, a nawet komend i odczytania z nich wyjścia

    Po co uruchamianie innych procesów?
    - Uruchamianie dosłownie dowolnych komend dostępnych w programach cli/lini komend.
    - Kontrolowanie systemu i pobieranie informacji na jego temat.
    - Automatyczne systemy CI/CD (continious integration, continious delivery), w tym automatyczne pobieranie aktualizacji czy kodu z GIT.

    jest kilka alternatyw robiących teoretycznie to samo:
    - child_process.exec
    - child_process.execFile
    - child_process.fork
    - child_process.spawn
    Z nich wszystkich najabardziej uniwersalny jest exec.
*/

const {exec} = require('child_process');

function program1() {
    const cp = exec('dir'); //tworzy obiekt typu ChildProcess
    cp.on('close', () => {
        console.log('Finished!');
    })
}

//program1()

function program2() {
    const cp = exec('ping 8.8.8.8');
    cp.on('close', () => {
        console.log('Finished!');
    })
}

//program2()

/*
Można jako środkowy parametr do exec przekazać opcje.
Najważniejsze:
- bardzo często aby sterować programem zmieniamy mu zmienne środowiskowe. Możemy je nadpisać w używając opcji env.
  Na tym env-a kończymy na razie... zostanie rozwinięty w kolejnych lekcjach.
- aktualny folder roboczy. Możemy go ustawić dzięki opcji cwd.
  Polecam zawsze to robić gdy budujemy większy system jak CI/CD bo dzięki temu mamy pewność, że program wykonuje się tam gdzie nam się wydaje.
  Przetestujemy to później.
- timeout. Polecam go dawać, często przydaje się gdyby jakaś automatyzacja miała się zawiesić.

Ręczne zawieszenie procesu: cp.kill() . Co to oznacza... Na unixie domyślnie prośbę dla procesu aby się zakończył.
  Na Windowsie ubicie procesu. Any na unixie uzyskać podobny efekt co na Windowsie papiszemy cp.kill('SIGKILL');
 */

function program3() {
    const cp = exec('ping 8.8.8.8', {
        env: {
            PATH: '',
            timeout: 1000, // Automatycznie przerwie proces po 1s.

        }
    });
    cp.on('close', () => {
        console.log('Finished!');
    })
    cp.kill();
    setTimeout(()=>{
        cp.kill();
    }, 1000)
}

//program3()

/*
Strumienie. Często głównie w systemach Unixowych - mówimy o strumieniach. Najważniejsze z nich to:
- stdout - standardowe wyjście programu;
- stdin - wejście programu;
- stderr - wyjście programu dla błędów (uwaga: niektóre programy np GIT czy npm wykorzystują czasem to wyjście, żeby podkreślić coś ważnego, a nie tylko jako błąd. )

Takie same istnieją w ChildProcess. Można nimi manipulować na wiele sposobów, ale póki co zostawimy je w spokoju takie jakie są.
 */

function program4() {
    const cp = exec('dir');
    cp.stdout.on('data', data => {
        console.log('Data...', data) // wyświetli się 2 razy, bo dir dwa razy coś pisał do wyjścia: 1) wypisał nagłówek, 2 wypisał katalogi
    })

    cp.stderr.on('data', err => {
        console.log('Error...', err)
    })

    cp.on('close', () => {
        console.log('Finished!');
    })
}
//program4()

function program5() {
    const cp = exec('ping 8.8.8.8'); // możemy ać też 'npm init -y', możemy coś zainstalować, etc.
    cp.stdout.on('data', data => {
        console.log('Data...', data) // wyświetli się 2 razy, bo dir dwa razy coś pisał do wyjścia: 1) wypisał nagłówek, 2 wypisał katalogi
    })

    cp.stderr.on('data', err => {
        console.log('Error...', err)
    })

    cp.on('close', () => {
        console.log('Finished!');
    })
}
//program5()


//Wersja poniższe będzie czekało do końca programu, ten callback się wykona raz
function program6() {
    exec('dir', (error, stdout, stderr)=>{
        if (error) {
            console.error('Oh, no!', error);
        } else if (stderr) {
            console.log("Error in app!", stderr);
        } else {
            console.log("Prog has finished", stdout);
        }
    });

}

program6()