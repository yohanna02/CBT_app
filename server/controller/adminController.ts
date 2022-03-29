import { Request, Response } from "express";

import { classModel } from "../model/adminModels";

export const addNewClass = async (req: Request, res: Response) => {
  try {
    const classExist = await classModel.findOne({
      name: req.body.className,
    });
    if (classExist) return res.status(422).json({ msg: "Class already Exist" });

    const newClass = new classModel({
      name: req.body.className,
    });

    await newClass.save();
    res.json({ msg: "Added class successfully" });
  } catch (error) {
    res.json({ msg: "An Error occured" });
  }
};

export const fetchClass = async (req:Request, res: Response) => {
  try {
    const classList = await classModel.find();

    res.json(classList);
  } catch (error) {
    res.json({ msg: "An Error occured" });
  }
};

export const deleteClass =async (req:Request, res: Response) => {
  try {
    const deleted = await classModel.deleteOne({_id: req.params.id});

    if (!deleted.acknowledged) {
      res.status(422).json({msg: "Error Deleting class"});
    }
    
    res.json({msg: "Delete Class Successfully"});

  } catch (error) {
    res.json({ msg: "An Error occured" });
  }
}
