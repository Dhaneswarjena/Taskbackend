import mongoose from "mongoose";

const profileschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  profile: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "authmodel",
  },
});

const profilemodel = mongoose.model("profilemodel", profileschema);
export default profilemodel;
