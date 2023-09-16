import mongoose from "mongoose";

export interface ClassInterface {
  _id?: mongoose.ObjectId;
  name: string;
  students: StudentInterface[];
}

export interface StudentInterface {
  _id?: mongoose.ObjectId;
  regNo: string;
};
