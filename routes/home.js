const express = require('express');
const {COOKIE_BASES, COOKIE_ADDONS} = require('../data/cookies-data.js');
const { getAddonsFromReq } = require('../utils/get-addons-from-req.js');
const { handlebarsHelpers } = require('../utils/handlebars-helpers.js');
const homeRouter = express.Router();

homeRouter.get('/', (req,res)=>{

    const {cookieBase, cookieAddons} = req.cookies;

    const addons = getAddonsFromReq(req);
    
    const sum = handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase || "light")
    + addons.reduce((prev, curr) => {
        return prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr);
    }, 0)
    res.render('home/index', {
        cookie: {
            base: cookieBase || 'light',
            addons: addons,
        },
        bases: Object.entries(COOKIE_BASES),
        addons: Object.entries(COOKIE_ADDONS),
        sum,
    });
});

module.exports = {
    homeRouter,
}
