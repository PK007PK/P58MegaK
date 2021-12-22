
const mongo = require('mongodb');

function program1() {
    const client = new mongo.MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('mega_test');
        const cars = db.collection('cars');
        const users = db.collection('users');
        const foundUsers = users.find();

        //Zwróć uwagę ile foundUsers ma zaszytych metod
        console.log(await foundUsers.next());
        console.log(await foundUsers.count());
        console.log(await foundUsers.hasNext());
        console.log(await foundUsers.toArray());

        await client.close();
    })();
}
//program1()

function program2() {
    const client = new mongo.MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('mega_test');
        const users = db.collection('users');
        const foundUsers = users.find();

        // SUPER, NOWE, WAŻNe
        for await (const user of foundUsers) {
            console.log(user);
        }

        //Można też tak:
        /*
        for await (const user of users.find()) {
            console.log(user);
        }

        for await (const user of db.collection('users').find()) {
            console.log(user);
        }

        */

        const oneUser = await db.collection('users').findOne();
        
        //Tak się pozbywamy ObjectId aby mieć czyste id
        console.log(oneUser._id.toString());
        console.log(String(oneUser._id));
        console.log(oneUser._id + "");

        //W drugą stronę. Mamy id, szukamy objectId:
        const objectFound = await db.collection('users').findOne({_id: mongo.ObjectId('61bc26eb573839bde6d3c84f')})
        console.log(objectFound);
        await client.close();
    })();
}
//program2()

/*
    Refaktoryzacja
*/

const {MongoClient, ObjectId} = require('mongodb');

function program3() {
    const client = new MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('mega_test');
        const objectFound = await db.collection('users').findOne({
            _id: ObjectId('61bc26eb573839bde6d3c84f')
        })
        console.log(objectFound);
        await client.close();
    })();
}
//program3()

function program4() {
    const client = new MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('mega_test');

        //Result możemy destrukturyzować, np {modifiedCount}
        const result = await db.collection('users').updateOne({
            _id: ObjectId('61bc274c573839bde6d3c850')
        },
        {
            $set: {
                firstName: "Arward",
                lastName: "Wrapnik",
            },
            $inc: {
                yearOfJoin: 10,
            },
        })
        console.log(result);

        await client.close();
    })();
}
//program4()

/*
Mongoose - moduł npm 
Ułatwia operacje na mongo db, w porównaniu do modułu 
mongodb. 
*/

/*Bezpieczeństwo
NOSQL są trudniejsze do zabezpieczenia niż SQL
Aby było bezpieczniej należy używać typów prostych i rzutować
*/

function program5() {
    const client = new MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('mega_test');
        //User jakoś podaje dane do aplikacji. Bez znaczenia jak:
        const email = "aaa@aaa.pl";
        /*
        Jeżeli jednak user będzie złośliwy to poda:
        {$ne: 'aaa@aaa.pl'}; lub
        {$ne: ''} i tym sposobem wyświetla wszystkich użytkowników
        znaczenie: email to cokolwiek, byle nie było puste
        noSQL Injection
        */
        for await (const user of db.collection('users').find({
            email,
            //zabezpieczenie: email: String(email),
        })) {
            console.log(user);
        }

        await client.close();
    })();
}
//program5()

//Zadania:

function program6() {
    const client = new MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('megak_music2'); // stworzy bazę
        await db.createCollection('songs');
        const songs = [{
            title: 'Kod',
            artist: 'Tau', 
            length: 100,
        },
        {
            title: 'Na cały świat',
            artist: 'Sokół', 
            length: 300,
        },
        {
            title: 'Vagrant',
            artist: 'Faint', 
            length: 250,
        }];
        //Dodajemy:
        await db.collection('songs').insertMany(songs);

        //Wyświetlamy: 
        console.log("All songs");
        for await (const song of db.collection('songs').find()) {
            console.log(song);
        }

        console.log("All songs by Tau");
        for await (const song of db.collection('songs').find({
            artist: 'Tau',
        })) {
            console.log(song);
        }
        /*
        Powyżej możemy też bardziej dokładny operator porównania:
        artist: {
            $eq: "Tau",
        },
        */

        //Poniżej tworzymy dodatkową kolekcję idąc na skróty
        const artists = [
            {
                name: 'Tau',
                startedAt: new Date('2010-01-01 12:00'), 
            },
            {
                name: 'Sokół',
                startedAt: new Date('2015-05-01 12:00'), 
            },
            {
                name: 'Faint',
                startedAt: new Date('2019-08-01 12:00'), 
            }
        ];
        await db.collection('artists').insertMany(artists);

        //Usuwamy artystę ze wszystkich songsów: 
        await db.collection('songs').updateMany({}, {
            $unset: {
                artist: "",
            }
        })

        //Usuwamy artystę który zaczą dawniej niż 100 lat temu
        await db.collection('songs').updateMany({}, {
            startedAt: {
                $lt: new Date('1921-11-15 16:15'),
            }
        })

        await client.close();
    })();
}
program6()