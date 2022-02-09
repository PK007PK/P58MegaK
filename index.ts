import * as express from 'express';
import "express-async-errors"; //To musi być pod ekspresem, żeby hackować expresa. 
import {static as eStatic, urlencoded} from 'express';
import * as methodOverride from 'method-override';
import {engine} from 'express-handlebars';
import { homeRouter } from './routers/home';
import { warriorRouter } from './routers/warrior';
import { arenaRouter } from './routers/arena';
import { hallOfFameRouter } from './routers/hall-of-fame';
// import { handleError } from './utils/errors';

const app = express();
app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({//Zmieniło się w stosunku do poprzednich wersji
    extname: 'hbs',
    //helpers: ???
})); 
app.set('view engine', '.hbs');

//Routy powinniśmy dodawać po konfiguracji ekspresu, a przed obsługą błędów
app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

//app.use(handleError)
app.listen(3000, ()=>console.log("Listening on http://localhost3000"));
