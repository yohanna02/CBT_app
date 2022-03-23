import mongoose from "mongoose";
import User from "../interfaces/UserInterface";

const schema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
  
const model = mongoose.model<User>("user", schema);

export default model;
