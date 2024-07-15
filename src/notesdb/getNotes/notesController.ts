import { NextFunction, Response, Request } from "express"
import NotesModel from "../notesModel";

const listNotes= async(req:Request, res:Response, next:NextFunction)=>{
    try{
      const notes= await NotesModel.find();
      res.json(notes);
    }catch (err){
      res.status(500).json({error:err})
    }
};
export {listNotes}