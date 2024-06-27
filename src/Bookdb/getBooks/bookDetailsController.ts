import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bookModel from "../bookUpload/bookModel";

const listBooks = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const book = await bookModel.find();
        res.json(book);
    } catch (err) {
        return next(createHttpError(500, "Error while getting a book"));
    }
};

const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.query

    try {
        const book = await bookModel
            .findOne({ title })
        if (!book) {
            return next(createHttpError(404, "Book not found."));
        }

        return res.json(book);
    } catch (err) {
        return next(createHttpError(500, "Error while getting a book"));
    }
};

export { listBooks, getSingleBook };
