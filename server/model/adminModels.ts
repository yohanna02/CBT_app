import mongoose from "mongoose";
import ClassInterface from "../interfaces/ClassInterface";

const classSchema = new mongoose.Schema<ClassInterface>({
  className: {
    type: String,
    required: true,
  },
});

export const classModel = mongoose.model<ClassInterface>("class", classSchema);
