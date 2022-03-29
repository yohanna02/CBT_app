import mongoose from "mongoose";
import ClassInterface from "../interfaces/ClassInterface";

const classSchema = new mongoose.Schema<ClassInterface>({
  name: {
    type: String,
    required: true,
  },
});

export const classModel = mongoose.model<ClassInterface>("class", classSchema);
