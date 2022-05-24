import mongoose from "mongoose";
import { ClassInterface, StudentInterface } from "../interfaces/AdminInterface";


const studentSchema = new mongoose.Schema<StudentInterface>({
  regNo: {
    type: String,
    required: true
  }
});

const classSchema = new mongoose.Schema<ClassInterface>({
  name: {
    type: String,
    required: true
  },
  students: [ studentSchema ]
});

const classModel = mongoose.model<ClassInterface>("class", classSchema);

export default classModel;
