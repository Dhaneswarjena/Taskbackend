import mongoose from "mongoose";

const taskschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refer: "authmodel",
    },
  },
  { timestamps: true }
);

const taskmodel = mongoose.model("taskmodel", taskschema);
export default taskmodel;
