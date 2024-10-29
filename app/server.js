import express from 'express';
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes for canny.io webhook
import cannyRoutes from './routes/canny.routes.js';
app.use('/canny', cannyRoutes);


app.listen(PORT, () => {
  console.log(`canny-github-bridge service listening on port ${PORT}`);
});