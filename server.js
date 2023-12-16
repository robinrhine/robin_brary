
/*if(process.env.NODE_ENV !== 'production')
{
    import 'dotenv/config';
}*/
import 'dotenv/config';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import path from 'path';
import indexRouter from './routes/index.js';

const app = express();
const __dirname = path.resolve();
//console.log(__dirname);


app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');



app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', ()=> console.log('Connected to mongoose'));


app.use('/',indexRouter);

app.listen(process.env.PORT|| 3000);
