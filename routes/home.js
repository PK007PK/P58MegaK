const express = require('express');
const { getCookieSettings } = require('../utils/get-cookie-settings.js');

const homeRouter = express.Router(); //Wskazujemy, że tworzymy router, czyli kawałek, 
//wycinek ekspresowej aplikacji. Równie dobrze to wszystko moglibyśmy przenieść do index

homeRouter
    .get('/', (req,res) => {
        const {sum, addons, base, allBases, allAddons} = getCookieSettings(req);

        res.render('home/index', {
            cookie: {
                base: base || 'light',
                addons,
            },
            allBases,
            allAddons,
            sum,
        })
    });

module.exports = {
    homeRouter,
}
