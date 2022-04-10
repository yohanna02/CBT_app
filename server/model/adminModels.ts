import mongoose from "mongoose";
import { ClassInterface, StudentInterface } from "../interfaces/AdminInterface";

const classSchema = new mongoose.Schema<ClassInterface>({
  name: {
    type: String,
    required: true
  },
});

export const classModel = mongoose.model<ClassInterface>("class", classSchema);

const studentSchema = new mongoose.Schema<StudentInterface>({
  regNo: {
    type: String,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const studentModel = mongoose.model<StudentInterface>("student", studentSchema);
