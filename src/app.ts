import Express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./Bookdb/bookRouter";



const app = Express();
app.use(Express.json());

//Routes
app.get("/", (req, res, next) => {
    res.json("Hello World");
});

app.use(globalErrorHandler)

//Router
app.use("/api/v1/", userRouter);

app.use("/api/v1/", bookRouter);


export default app;