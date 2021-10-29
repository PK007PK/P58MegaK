const { getAddonsFromReq } = require('../utils/get-addons-from-req.js');
const {COOKIE_BASES, COOKIE_ADDONS} = require('../data/cookies-data.js');
const { handlebarsHelpers } = require('../utils/handlebars-helpers.js');

function getCookieSettings(req) {
    const {cookieBase: base} = req.cookies;

        const addons = getAddonsFromReq(req);
        
        const allBases = Object.entries(COOKIE_BASES);
        const allAddons = Object.entries(COOKIE_ADDONS);

        const sum = handlebarsHelpers.findPrice(allBases, base || "light")
        + addons.reduce((prev, curr) => {
            return prev + handlebarsHelpers.findPrice(allAddons, curr);
        }, 0)

        return {
            //Sellectred stuff
            addons,
            base,

            //Calculations
            sum,

            //All possibilities
            allBases,
            allAddons
        }
}

module.exports = {
    getCookieSettings,
}