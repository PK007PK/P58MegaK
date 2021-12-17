/*
Komendy w MONGO
Liczy się wielkość liter. 
use nazwa_bazy. Uwaga, bo jeżeli ona nie istnieje to ją stworzysz.

Do dalszej pracy w katalogu bazy odpalamy najpierw mongod, potem mongo
i zaczynamy pracę w MongoShell

use mega_test / tworzymy bazę
db.createCollection('users') / tworzymy kolekcję... 

Pobranie dokumentów z kolekcji:
db.<nazwa>.find() np db.users.find ... nic się nie stanie, błędu nie ma
nic nie wyświetli bo nic tam nie ma. 

db.<nazwa kolekcji>.insert(obiekt); Kolekcja nie musi nawet istnieć. 
Jeżeli nie ma to zostanie stworzona. 
JEżeli zrobimy db.xxx.insert to stworzy wszystko od podstaw dla nas, nie pokaże
błędu. 

db.users.insert({email: "aaa@ss.pl"})
zwróci info ile elementów zostało zwróconych do kolekcji. 
Insert może też wstawić tablicę obiektów. [{}, {}]

pobieranie danych:
db.users.find()
Pojawia się obiect id: _id . Dodaje się to z automatu, chyba że sami dodamy ręcznie. 
Id jest w formie ObjectId. Są to specjalne obiektry bazujące na stringach. Wszystkie id
są hashami. Nie są kolejnymi liczbami. 

Wyszukiwanie. 
db.users.find({email: "aaa@aaa.pl"}). Jak znajdzie to zwróci nam cały obiekt. JAk nie ma
to nic nie zwróci. 

Obiect id wygląda jak string, ale nim  nie jest. 
db.users.find({_id: "..."}) nie znajduje nic nawet jak podamy dokładny string id. 
Musimy szukać find _id ObjectId("...") teraz znajdzie. 

cls - resetuje widok

findOne - znajdzie jeden obiekt. Jeżeli nie znajdzie zwróci null. 
Sam find zwróci pustą tablicę. 

Jezeli wyszukamy po w kolekcji po czymś co nie istnieje np właściwości
której nie mają wszystkie rekordy to te które nie mają zwyczajnie nie
zostaną znalezione. 

ctrl c - zamknie mongo.

1) use megak_music //ona jeszcze tu nie istnieje, ale już umawiamy się że db będzie się do niej odnosiło
2) dodajemy kolekcję songs, ale wcale nie musimy tego robić bezpośrednio.
db.createCollection('songs');
3) db.songs.insert([{...},{...}])
4) Wyświetl wszystkie piposenki: db.songs.find()
5) Wyszukaj piosenki danego artysty db.songs.find({artist: "aaa"})

Zaawansowane wyszukiwanie. 
W mongo jak chcemy wyszukiwać to wpisujemy pole, a potem obiekt z parametrami 
porównania:
.find({
    age: {$eq: 100},
})
db.songs.find({
    artist: {
        $eq: 'Tau',
    }
}}

= $eq
<> $ne
> $gt
< $it
>= $gte
<= $lte

db.songs.find({length: {$gt: 250}})
db.songs.find({length: {$gt: 250, $lt: 300}})

Operatory logiczne:
Jeżeli chcemy tylko "i" to może być też tak jak było powyżej gdzie jest skrót
find({
    $and: [
        {name: "Kuba"},
        {lastName: "Król"},
    ]
})

$and: [{},{}...]
$or: [{},{}...]
$not: [{},] not jest trochę inny:
db.songs.find({ artist: 
    {
        $not: {
            $eq: 'Sokół',
            $eq: 'Fafik',
        }
    }
})

*/