import express from 'express';
import calculateRoute from './routes/calculateRoute';

const app = express();
app.use(express.json());
app.use('/', calculateRoute);
export default app;
