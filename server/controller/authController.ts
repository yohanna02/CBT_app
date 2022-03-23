import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import adminModel from "../model/authModel";

export const JWTSecret = "nv834f0wemvcpw 234r-0i-20fiew0f 0weif09weif-0w";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailExist = await adminModel.findOne({ email });

    if (emailExist) return res.status(422).json({ msg: "Email already Exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.json({ msg: "Admin registered successfully" });
  } catch (error) {
    res.json({ msg: "An Error occured" });
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isAdmin = await adminModel.findOne({ email });

    if (!isAdmin)
      return res.status(401).json({ status: false, msg: "User does'nt exist" });

    const isPassword = await bcrypt.compare(password, isAdmin.password);
    if (!isPassword)
      return res
        .status(401)
        .json({ status: false, msg: "Password not correct" });

    const token = jwt.sign({ _id: isAdmin._id }, JWTSecret, {
      expiresIn: "2h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "An Error occured" });
    console.error(error);
  }
};
