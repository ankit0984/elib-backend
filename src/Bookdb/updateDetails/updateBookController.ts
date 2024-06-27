import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cloudinary from "../../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "../bookUpload/bookModel";

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, category } = req.body;
    const bookId = req.params.bookId;

    // Validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return next(createHttpError(400, "Invalid book ID"));
    }

    const book = await bookModel.findById(bookId);

    if (!book) {
        return next(createHttpError(404, "Book not found"));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let completeCoverImage = "";
    if (files && files.coverImage) {
        const coverImageFile = files.coverImage[0];
        const filename = coverImageFile.filename;
        const coverMimeType = coverImageFile.mimetype.split("/").pop();
        const filePath = path.resolve(__dirname, "../../../public/data/uploads/", filename);

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            public_id: filename,
            folder: "book-covers",
            format: coverMimeType,
        });

        completeCoverImage = uploadResult.secure_url;
        await fs.promises.unlink(filePath);
    }

    let completeFileName = "";
    if (files && files.file) {
        const file = files.file[0];
        const filename = file.filename;
        const filePath = path.resolve(__dirname, "../../../public/data/uploads/", filename);

        // Upload to Cloudinary
        const uploadResultPdf = await cloudinary.uploader.upload(filePath, {
            resource_type: "raw",
            public_id: filename,
            folder: "book-pdfs",
            format: "pdf",
        });

        completeFileName = uploadResultPdf.secure_url;
        await fs.promises.unlink(filePath);
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
        bookId,
        {
            title,
            description,
            category,
            coverImage: completeCoverImage || book.coverImage,
            file: completeFileName || book.file,
        },
        { new: true }
    );

    res.json(updatedBook);
};

export { updateBook };
