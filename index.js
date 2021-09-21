/*
W terminalu wpisz node. 
Otwiera się jak coś jak konsola w przeglądarce, gdzie można wpisywać kod JS.  
Wyjście ctrl + c. 

Nie pamiętamy nazwy pliku. 
Wpisujemy w konsoli node i tabem tabujemy w poszukiwaniu właściwej nazwy. 

Aby proces trwał cały czas. Robimy moduł:
*/

function program1() {
    setInterval(
	    () => console.log('AAAAA'), 250)
}

//program1();

/*
Powyższy proces będzie działał w nieskończoność. 
Chyba że ctrl + c. 

W nodzie większość rzeczy musimy sobie pobrać. 
Zaimportować. W odróżnieniu od przeglądarki. Czyli: 

*/

const { readFile } = require('fs'); 
//fs to file system, ma bardzo dużo funkcjonalności, 
//więc przez destrukturyzację określamy jak które z nich pobieramy. 

function program2() {
    readFile('./index.js', 'utf8', (err, file)=>console.log(file));
}

program2()