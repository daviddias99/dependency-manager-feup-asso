import cors from 'cors';
import express from 'express';
import getDependencies from './dependency-manager';

const app = express();
const port = 8002; // default port to listen

// middlewares
const options: cors.CorsOptions = {
  origin: '*',
};
app.use(cors(options));
app.use(express.json());

app.get('/:url', async (req, res) => {
  res.json(await getDependencies(req.params.url));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
