import mongoose from "mongoose";

export interface ClassInterface {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface StudentInterface {
  _id: mongoose.ObjectId,
  regNo: string,
  class_id: mongoose.Schema.Types.ObjectId
};
