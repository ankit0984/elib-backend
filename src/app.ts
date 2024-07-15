import Express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./Bookdb/bookRouter";
import cors from 'cors'
import notesRouter from "./notesdb/notesdbRouter";

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const app = Express();
app.use(Express.json());

//Routes

app.use(globalErrorHandler)

//Router
app.use("/api/v1/", userRouter, cors(corsOptions));
app.use("/api/v1/", notesRouter, cors(corsOptions));
app.use("/api/v1/", bookRouter, cors(corsOptions));


export default app;