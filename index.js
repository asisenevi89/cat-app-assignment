import dotenv from 'dotenv';
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URL
}));


//load routes
import routes from './app/routes/index.js';
routes(app);

//launch app
dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log('live on port ' + port);
});