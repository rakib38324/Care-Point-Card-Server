import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routers';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

//--->parser
app.use(cookieParser());

app.use(cors());
// app.use(
//   cors({
//     origin: ['https://cmd-new.blockshare.app', 'http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Only if you're using cookies or auth headers
//   }),
// );

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//==========>application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Care Point Server Server is running successfully.');
});

//========> handle the router not found
app.use(notFound);

//--> global error
app.use(globalErrorHandler);
export default app;
