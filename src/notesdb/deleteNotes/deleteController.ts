import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import notesModel from '../notesModel';
import createHttpError from 'http-errors';
import cloudinary from '../../config/cloudinary';

const deleteNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let notesId = req.params.notesId;

    // Remove the leading colon if present
    if (notesId.startsWith(':')) {
      notesId = notesId.slice(1);
    }

    // Validate notesId
    if (!mongoose.Types.ObjectId.isValid(notesId)) {
      return next(createHttpError(400, "Invalid note ID"));
    }

    const note = await notesModel.findOne({ _id: notesId });
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }

    const noteFileSplits = note.file.split("/");
    const noteFilePublicId = noteFileSplits.at(-2) + "/" + noteFileSplits.at(-1);
    console.log("noteFilePublicId", noteFilePublicId);

    await cloudinary.uploader.destroy(noteFilePublicId, {
      resource_type: "raw",
    });

    await notesModel.deleteOne({ _id: notesId });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting note:", error);
    return next(createHttpError(500, "An error occurred while deleting the note"));
  }
};

export { deleteNotes };