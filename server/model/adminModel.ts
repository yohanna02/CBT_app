import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
  
const model = mongoose.model("admin", schema);

export default model;
