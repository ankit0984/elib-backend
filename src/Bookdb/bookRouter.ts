// import Router  from "express";
// import { updateBook } from "./updateDetails/updateBookController";
// import {createBook} from "./bookUpload/bookDBController"
// import upload from "../middleware/fileUpload";
// import { listBooks } from "./getBooks/bookDetailsController";
// // import {bookDB} from "./Login/loginController";

// const bookRouter = Router();

// bookRouter.post('/bookdb/add',upload.fields([
//     {name:'coverImage',maxCount:1},
//     {name:'file',maxCount:1}
// ]), createBook)

// bookRouter.put(
    
//     '/bookdb/update:bookId',upload.fields([
//     {name:'coverImage',maxCount:1},
//     {name:'file',maxCount:1}
// ]), updateBook)
// bookRouter.get('/bookdb', listBooks)
// bookRouter.get('/bookdb:bookId', listBooks)




// export default bookRouter;
import Router from "express";
import { updateBook } from "./updateDetails/updateBookController";
import { createBook } from "./bookUpload/bookDBController";
import upload from "../middleware/fileUpload";
import { listBooks, getSingleBook } from "./getBooks/bookDetailsController";

const bookRouter = Router();

bookRouter.post('/bookdb/add', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), createBook);

bookRouter.put('/bookdb/update/:bookId', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), updateBook);

bookRouter.get('/bookdb', listBooks);

// New route for getting books by title and/or category
bookRouter.get('/bookdb/search', getSingleBook);


export default bookRouter;