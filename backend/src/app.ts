import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import cors from 'cors';
import authRoutes from './routes/auth';
import softwareRoutes from './routes/software';
import requestRoutes from './routes/requests';
import { checkJwt } from './middleware/auth';

const app = express();

app.use(cors());
app.use(express.json());

createConnection().then(() => {
  app.use('/api/auth', authRoutes);
  app.use('/api/software', checkJwt, softwareRoutes);
  app.use('/api/requests', checkJwt, requestRoutes);

  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});