import * as express from 'express';
import "express-async-errors"; //To musi być pod ekspresem, żeby hackować expresa. 
import {static as eStatic, urlencoded} from 'express';
import * as methodOverride from 'method-override';
import {engine} from 'express-handlebars';
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

app.get('/', (req,res) => {
    res.send('hello');
});

//app.use(handleError)
app.listen(3000, ()=>console.log("Listening on http://localhost3000"));
