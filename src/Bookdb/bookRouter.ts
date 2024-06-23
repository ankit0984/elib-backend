import Router  from "express";

import {createBook} from "./bookUpload/bookDBController"
import upload from "../middleware/fileUpload";
// import {bookDB} from "./Login/loginController";

const bookRouter = Router();

bookRouter.post('/bookdb/update',upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]), createBook)
// userRouter.get('/bookdb', bookDB)




export default bookRouter;