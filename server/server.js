import express, { json, urlencoded, static as myStatic } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users.js';
import testsRouter from './routes/tests.js';
import * as env from 'dotenv';
env.config()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.VUE_APP_SERVER_PORT);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on ${process.env.VUE_APP_BASE_URL}:${app.get('port')}`);
});

connect(process.env.MONGO_BD, { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));

app.use(cors({ origin: `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_PORT}` }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/users', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/', myStatic(join(__dirname, '../dist')));
