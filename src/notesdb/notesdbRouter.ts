import Router from "express";
import { listNotes } from "./getNotes/notesController";
import { createNote } from "./notesUpload/notesUploadController";
import upload from "../middleware/fileUpload";
import { deleteNotes } from "./deleteNotes/deleteController";
const notesRouter=Router();


notesRouter.get('/notesdb', listNotes)
notesRouter.post('/notesdb/upload',upload.fields([
  { name: 'file', maxCount: 1 }]) , createNote)
notesRouter.delete('/notesdb/delete:notesId', deleteNotes)


export default notesRouter;