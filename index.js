/*
Buffer.
Node.js zawiera kilka specyficznych (często dla siebie, ale czasem adoptowanych dalej) struktur i technik.

Jedną z takich struktur jest Buffer. Jest to klasa reprezentująca czysty wycinek pamięci lub danych - często binarnych,
bez ich obróbki czy zmiany na tekst.

Jest dostarczany w core noda.

Czysty JS nie radzi sobie z prostymi danymi binarnymi. Bo nie po to powstał. Kod binarny -
np kiedy otworzymy obrazek webp w notatniku zobaczymy sieczkę. Będzie to kod binarny przeroibiony na tekst. Tak samo TCPIP,
odczytywanie, zapisywanie w systemie plików.
Czasem trzeba to jednak obsłużyć. Obchodzi się to wykorzystując ciągi. Lepszy jednak jest to tego buffer.
Nie używaj ciągów binarnych. Zamiast tego użyj Buffer!

Co zawiera Buffer/ To coś w rodzaju tablicy, która ma stałą szerokość.
Reprezentuje pewną pamięć, która znajduje się poza V8 - silnikiem JS-a.

Buffer zawiera liczby - ciągi bajtów. Są one więc z przedziału 0 -255(hexem 0 - ff).

Mimo że Buffert to klasa, to nie używamy go w ten sposób: new Buffer().
Ręcznie możemy go stworzyć pisząc w ten sposób: const buff = Buffer.aloc(20); //aloc - metoda statyczna dostępna
bezpośrednio na klasie.

Alokujemy, tzn rezerwujemy, w ten sposób w pamięci 16 bajtów, gdzie znajduje się nasz Buffer.


 */
function program1() {
    const buff = Buffer.alloc(20);
    console.log(buff);
    /*
    Wyświetli

    <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>

        czyli 20 bajtów, każdy wypełniony zerem
     */

    buff.write("Hello, World", 'utf8');

    /*
    Wyloguje coś takiego. W tym mamy zakodowane Hellow world.
    Możemy to sobie sprawdzić np tu: www.asciitable.com
    <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 00 00 00 00 00 00 00 00>

     */
    console.log(buff);
    console.log(buff.toString()); // rozkoduje z ascii na text
    console.log(buff.toString('utf8'));
    console.log(buff.toString('hex')); // Zauważmy, że wersja binarna jaka jest w bufferze jest taka sama jak szesnastkowa,
//tylko bez spacji.

    buff.write("Zażółć gęślą jaźń!", 'utf8');
    console.log(buff.toString('utf8')); // Nie zmieści się cały teskt w 20 bajtach. Utf8 ma stałą szerokość dla prostych
//stringów.

    console.log(Buffer.byteLength('a', 'utf8')) // długość w bajtach 1
    console.log(Buffer.byteLength('ą', 'utf8')) // długość w bajtach 2, emoji będą kodowane w 4,

    /*
    Możemy robić buffera z czegoś, i wtedy dobierze sobie ilość bajtów w sam raz.
     */

    const buff2 = Buffer.from("Zażółć gęślą jaźń!");
    console.log(buff2);
    console.log(buff2.length);
}

/*
Buffer może być także min:
- czyszczony i wypełniany;
- kopiowany;
- porównywany;
- odczytywany;
 */

/*
Jakieś praktyczne wykorzystanie. Np nasze programy szyfrujące obsługują tylko dane tekstowe.
Dzięki bufferowi mogą obsłużyć także dane binarne.
 */