import mongoose from "mongoose";

const authschema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const authmodel = mongoose.model("authmodel", authschema);
export default authmodel;
