const {Restaurant, Restaurant2, Restaurant3} = require('./restaurant');

function program1() {
    const megaRestaurant = new Restaurant();
    let tablesCount = 25;

// Tutaj dodaj nasłuchiwanie
    megaRestaurant.on('open', () => console.log("Otwarto restaurację."));
    megaRestaurant.on('close', () => console.log("Zamknięto restaurację."));
    megaRestaurant.on('reserveTable', () => {
        tablesCount--;
        console.log("Zarezerwowano stolik. Dostępnych stolików:", tablesCount);
    });
    megaRestaurant.on('cancelTableReservation', () => {
        tablesCount++;
        console.log("Odwołano rezerwację stolika. Dostępnych stolików:", tablesCount);
    });
    megaRestaurant.on('takeTableWithoutReservation', () => {
        tablesCount--;
        console.log("Zajęto stolik bez rezerwacji . Dostępnych stolików:", tablesCount);
    });
    megaRestaurant.on('markTableAsBroken', () => {
        tablesCount--;
        console.log("Stolik zepsuty. Dostępnych stolików:", tablesCount);
    });
    megaRestaurant.on('cleanupTable', () => {
        tablesCount++;
        console.log("Posprzątano stolik:", tablesCount);
    });

    megaRestaurant.open(); // "Otwarto restaurację."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 24."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.cancelTableReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 21."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 20."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 19."
    megaRestaurant.markTableAsBroken();
    megaRestaurant.cleanupTable(); // "Dostepnych stolików: 20."

    megaRestaurant.close(); // "Zamknięto restaurację."
}

//program1()

function program2() {

    const decTablesCount = () => {
        tablesCount--;
        console.log(`Dostępnych stolików: ${tablesCount}`);
    }

    const incTablesCount = () => {
        tablesCount++;
        console.log(`Dostępnych stolików: ${tablesCount}`);
    }

    const megaRestaurant = new Restaurant2();
    let tablesCount = 25;

// Tutaj dodaj nasłuchiwanie
    megaRestaurant
        .on('open', () => console.log("Otwarto restaurację."))
        .on('close', () => console.log("Zamknięto restaurację."))
        .on('reserveTable', decTablesCount)
        .on('cancelTableReservation', incTablesCount)
        .on('takeTableWithoutReservation', decTablesCount)
        .on('markTableAsBroken', decTablesCount)
        .on('cleanupTable', incTablesCount);

    megaRestaurant.open(); // "Otwarto restaurację."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 24."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.cancelTableReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 21."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 20."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 19."
    megaRestaurant.markTableAsBroken();
    megaRestaurant.cleanupTable(); // "Dostepnych stolików: 20."

    megaRestaurant.close(); // "Zamknięto restaurację."
}

//program2();


function program3() {

    const megaRestaurant = new Restaurant3();
    let tablesCount = 25;

    megaRestaurant
        .on('open', () => console.log("Otwarto restaurację."))
        .on('close', () => console.log("Zamknięto restaurację."))
        .on('tableCountChange', change => {
            tablesCount += change;
            console.log(`Tables: ${tablesCount}`);
        })

    megaRestaurant.open(); // "Otwarto restaurację."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 24."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.cancelTableReservation(); // "Dostepnych stolików: 23."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 22."

    megaRestaurant.reserveTable(); // "Dostepnych stolików: 21."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 20."

    megaRestaurant.takeTableWithoutReservation(); // "Dostepnych stolików: 19."
    megaRestaurant.markTableAsBroken();
    megaRestaurant.cleanupTable(); // "Dostepnych stolików: 20."

    megaRestaurant.close(); // "Zamknięto restaurację."
}

program3();