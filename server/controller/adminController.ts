import { Request, Response } from "express";

import { classModel } from "../model/adminModels";

export const addNewClass = async (req: Request, res: Response) => {
  try {
    const classExist = await classModel.findOne({
      className: req.body.className,
    });
    if (classExist) return res.status(422).json({ msg: "Class already Exist" });

    const newClass = new classModel({
      className: req.body.className,
    });

    await newClass.save();
    res.json({ msg: "Added class successfully" });
  } catch (error) {
    res.json({ msg: "An Error occured" });
  }
};
