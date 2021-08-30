/*
Do listy na blachę:
arr.find() // zwróci jeden element z całej tablicy, dla którego dostaniemy pierwsze true.

Fetch w node.js . Warto z niego korzystać, bo jest to standardowe api przeglądarek.
Nie ma kilku fajnych rzeczy które ma axios. Ale jest standardem.

Backend często działa inaczej niż front. Na froncie przeglądarka dba o CORS i wszystko
co z nim związane.

Backend nie podlega podobnym ograniczeniom. Z drugiej strony BE nie weryfikuje tak dokładnie i dobrze SSL, HSTS itd.

Fetcha w node używamy za pomocą paczki node-fetch. Używamy tam innego formatu dołączania modułów(eksporty domyślne),
dlatego importujemy w ten sposób:

const fetch = require('node-fetch');
 */

const fetch = require('node-fetch')

function program1() {
    fetch('https://wp.pl')
        .then(r=>r.text())
        .then(html=>console.log(html));
}
//program1()

/*
Program 1 nie mógłby zadziałać w przeglądarce bo zostałby zablokowany przez wp. Ale w nodzie może działać.

W programie 2 pobieramy dane dla wszystkich stacji, gdyż api nie daje nam możliwości pobrania ich wyłącznie
dla określonej stacji. Gdybyśmy mieli taką możliwość, to program byłby szybszy.
 */

function program2() {
    const cityName = process.argv[2];

    // const processWeatherData = data => {
    //     data.find((stationData)=>{
    //         if (stationData.stacja === cityName) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     })
    // }
    const processWeatherData = data => {
        const dataFound = data.find((stationData) => stationData.stacja === cityName)
        //dataFound ? console.log(dataFound) : console.log("City not found");

        if (!dataFound) {
            console.log('Takiego miasta nasze API nie przewidziało!');
            return;
        };

        const {cisnienie: pressure, wilgotnosc_wzgledna: humidity,  temperatura: temperature} = dataFound;

        const weatherInfo = `In ${cityName} there is ${temperature}, ${humidity}% of humidity and pressure of ${pressure} hPa`;
        console.log(weatherInfo);
    }

    fetch('https://danepubliczne.imgw.pl/api/data/synop')
        .then(r=>r.json())
        .then(processWeatherData);
}

//program2()

/*
W prog 3 dodajemy zapisywanie do pliku.
 */

const { appendFile } = require('fs').promises;
const { normalize, resolve } = require('path');

function program3() {
    const cityName = process.argv[2];

    const getDataFileName = city => safeJoin('./data/', `${city}.txt`);

    function safeJoin(base, target) {
        const targetPath = '.' + normalize('/'+target);
        return resolve(base, targetPath);
    }

    const processWeatherData = async data => {
        const dataFound = data.find((stationData) => stationData.stacja === cityName)
        if (!dataFound) {
            console.log('There is no such city in our API!');
            return;
        };

        const {cisnienie: pressure, wilgotnosc_wzgledna: humidity,  temperatura: temperature} = dataFound;
        const weatherInfo = `In ${cityName} there is ${temperature}, ${humidity}% of humidity and pressure of ${pressure} hPa`;
        console.log(weatherInfo);
        const dataString = new Date().toLocaleDateString();
        await appendFile(getDataFileName(cityName), `\n${dataString}\n${weatherInfo}\n`, )
    }

    fetch('https://danepubliczne.imgw.pl/api/data/synop')
        .then(r=>r.json())
        //.then(processWeatherData)
        .then(data=>processWeatherData(data))
        .catch(error=>{
        console.log(console.log('Error has occurred :', error));
    })
}

//program3()

function program4() {
    function safeJoin(base, target) {
        const targetPath = '.' + normalize('/'+target);
        return resolve(base, targetPath);
    }

    const getDataFileName = city => safeJoin('./data/', `${city}.txt`);

    const processWeatherData = async (data, cityName) => {
        const dataFound = data.find((stationData) => stationData.stacja === cityName)
        if (!dataFound) {
           throw new Error('There is no such city in our api!')
        };

        const {cisnienie: pressure, wilgotnosc_wzgledna: humidity,  temperatura: temperature} = dataFound;
        const weatherInfo = `In ${cityName} there is ${temperature}, ${humidity}% of humidity and pressure of ${pressure} hPa`;
        console.log(weatherInfo);
        const dataString = new Date().toLocaleDateString();
        await appendFile(getDataFileName(cityName), `\n${dataString}\n${weatherInfo}\n`);
    }

    const checkCityWeather = async cityName => {
        try {
            const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
            const data = await res.json();
            await processWeatherData(data, cityName);
        } catch(error) {
            console.log('Error has occured :(', error);
        }
    }
    checkCityWeather(process.argv[2])
}

//program4()


function warmestPlaceInPoland() {

    const processWeatherData = async (data) => {
        //Sort jest mutujące
        // Poniżej poprzez spread operator tworzymy nową tablicę, bo nie chcemy sortować data.
        const sortedData = [...data].sort((a,b)=>{
            if (b.temperatura > a.temperatura) {
                return -1;
            };
            if (a.temperatura > b.temperatura) {
                return 1;
            }
            return 0;
        })
        //const sortedData = [...data].sort((a,b)=>b.temperatura - a.temperatura);
        const {stacja: station, temperatura: temperature} = sortedData[0];
        console.log(station, temperature);
    }

    const findWarmestPLaceInPoland = async () => {
        try {
            const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
            const data = await res.json();
            await processWeatherData(data);
        } catch(error) {
            console.log('Error has occured :(', error);
        }
    }
    findWarmestPLaceInPoland()
}

warmestPlaceInPoland()