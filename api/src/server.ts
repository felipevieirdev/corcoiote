import express from 'express';
import routerUsers from './routes/user.route.ts';

const app = express();

app.use(express.json());

app.use('/users', routerUsers);

app.listen(process.env.PORT);
