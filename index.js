/*
.deleteOne(query)
db.songs.deleteOne(_id: ObjectId("ds23e4asd23dqwd12"));

.deleteMany(query)
db.songs.deleteMany({ length: {$gt: 300}})

#Aktualizacje:
##.replaceOne(query, nowyDokument);
db.songs.replaceOne({_id: ObjectId("adasdadasdas")}, {length: 500})
Powyższe bardzo destruktywne. Usuniemy wszystko w obiekcie, zostawimy tylko
Id i to co przekażemy. 

Poniżej z wykorzystaniem obiektu zmian. Nie jest już tak destruktywne. 
Zaktualizuje tylko to co podamy, resztę zostawi bez zmian. 
db.songs.updateOne({_id: ObjectId('sxx')}, {
    $set: {
        isActive: true,
        sss: "sss",
    },
})
    $set - zmienia wartość określonych pól
    $inc / $dec - inkrementacja

    $inc: {
        length: 10, / zmiana o 10
    }

    $unset - kasowanie pola,
    $unset: {
        artist: "", - wybieramy pole i dajemy wartość póstego stringa
    }

    $set - dodawanie pola
    $currentDate: {
        updatedAt: true,
    }

    $currentDate: {
        updatedAt: new Date(2020-11-10 12:00), //Naszą strefę czasową przepisze na defaultową... ?
    }

##.replaceMany(query, nowy dokument);
db.songs.replaceMany({})

##Wyszukujemy wszystkie piosenki starsze niż rok:
db.songs.find({
    createdAt: {
        $lt: new Date('2020-12-15 12:45'),
    }
})

Zadanie:
1. Działamy na bazie mega_music.
2. Dodajemy kolekcję artists.
3. Usuwamy ze wszystkich dokumentów w kolekcji songs pole artist.
4. Dodajemy do kolekcji artists 3 doki, które zawierają nazwę artysty, oraz datę rozpoczęcia działalności artystycznej. 
5. Usuwamy wszystkich artystów, którzy rozpoczęli działalność wcześniej niż 100 lat temu, 

Zadanie dodatkowe - coś w rodzaju relacji. 
6. Powiąż piosenki z artystami. Po prostu dodaj w dokumentach songs pole odwołujące się do id w artists. 

Inny sposób dodania object ID:
{
    ""_id": {
        "$oid": "61bf62fa71b12ba07e7e01f7"
    }"
}

Jeżeli datę importujemy w JSON w Compass, to trzeba kombinować, 
np tak:
{
  "name": "Tau",
  "startedAt": {
    "$date": "2010-01-10T08:00:00Z"
  }
}

Usuwamy artystę: 
db.songs.updateMany({}, {
    $unset: {
        artist: "",
    }
})

Usuwamy artystów którzy rozpoczęli wcześniej niż 100 lat temu:
db.artists.deleteMany({
    startedAt: {
        $lt: new Date('1921-12-15 15:09'), 
    },
})

Powiązanie piosenek z artystami
db.songs.updateOne({
    _id: ObjectId('safsfsdfsd')},
    {
        $set: {
            artistId: ObjectId('dfsdfsdfdsd'),
        },
    }
)


#MongoDB Compass Comunity
https://www.mongodb.com/try/download/compass
Łączymy się z naszym lokalnym mongo: 
mongodb://localhost:27017/


#Pobieranie relacji w MongoDB
Brak twardego powiązania pomiędzy elementami. Relację możemy więc obsłużyć
Osobnymi zapytaniami w kodzie. Jeżeli usuniemy jeden dokument, 
to drugi nie będzie o tym wiedział. Trzeba więc obsłużyć to w kodzie. 

Ale też od mongodb 3.5 możemy obsłużyć coś co przypomina joina sqlowego.
.agregate([{
    $lookup: {
        from: <collection to join>.
        localField: <fieldFrom the input documents>,
        foreignField: <field from the documents of the "from" collection>,
        as: <output array field>
    }
}])

.agregate([{
    $lookup: {
        from: 'artists'.
        localField: 'artistId,
        foreignField: '_id',
        as: 'artist',
    }
}])


#Użycie MongoDB w Node
*/