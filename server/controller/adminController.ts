import { Request, Response } from "express";

import classModel from "../model/adminModels";

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

export const deleteClass = async (req:Request, res: Response) => {
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

export const addStudent = async (req: Request, res: Response) => {
  try {
    const studentExist = await classModel.findOne({ students: {$elemMatch: {regNo: req.body.regNo} }});
    if (studentExist) return res.status(422).json({msg: "Registration Number already exist"});

    const classExist = await classModel.findOne({_id: req.body.class_id});
    if (!classExist) return res.status(422).json({ msg: "Error! Class does not exist"});

    classExist.students.push({
      regNo: req.body.regNo
    });

    await classExist.save();

    res.json({msg: "Student registered successfully"});
  } catch (error) {
    console.log(error);
    res.json({ msg: "An Error occured" });
    // res.json(error);
  }
};
