import express from 'express';

import { connectDb } from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import { isAuthenticated } from './middleware/authMiddleware.js';
import apiRouter from './router/apiRoutes.js';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get('/ping',isAuthenticated, (req, res) => {
    console.log('ping api gets hitted ...');
    return res.status(200).json({
        success: 'true',
        message: 'Pong 🙂!'
    });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`server is listening on this port ${PORT}`);
    connectDb();
});
