
function program2() {
    const client = new mongo.MongoClient('mongodb://localhost:27017');
    (async() => {
        await client.connect();
        const db = client.db('megak_test');
        const cars = db.collection('cars');
        const users = db.collection('users');
        console.log(users.find());
        await client.close();
    })();
}
program2()