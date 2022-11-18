import express, { json, urlencoded, static as myStatic } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users.js';
import testsRouter from './routes/tests.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on http://127.0.0.1:${app.get('port')}`);
});

connect('mongodb://127.0.0.1:27017/level-of-english', { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.error(err));

app.use(cors({ origin: 'http://127.0.0.1:8080' }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/users', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/', myStatic(join(__dirname, '../dist')));
