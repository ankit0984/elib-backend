import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import createHttpError from "http-errors";
import notesModel from "../notesModel";


const createNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, category, description } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // 'application/pdf'
  // const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
  // const fileName = files.coverImage[0].filename;
  // const filePath = path.resolve(
  //   __dirname,
  //   "../../../public/data/uploads",
  //   fileName
  // );

  try {
    const noteFileName = files.file[0].filename;
    const noteFilePath = path.resolve(
      __dirname,
      "../../../public/data/uploads",
      noteFileName
    );

    const noteFileUploadResult = await cloudinary.uploader.upload(
      noteFilePath,
      {
        resource_type: "raw",
        filename_override: noteFileName,
        folder: "notes-pdfs",
        format: "pdf",
      }
    );

    const newBook = await notesModel.create({
      title,
      description,
      category,
      file: noteFileUploadResult.secure_url,
    });

    // Delete temp.files
    // await fs.promises.unlink(filePath);
    await fs.promises.unlink(noteFilePath);

    res.status(201).json({ id: newBook._id });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while uploading the files."));
  }
};


export { createNote};

