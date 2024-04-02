import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/route.js";

const app = express();
dontenv.config();
const mongorun = async () => {
  const connectmongo = await mongoose.connect(process.env.MONgoDB);
  if (connectmongo) {
    console.log("Mongodb atlas connected");
  }
};
mongorun();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.json([{ name: "Dhaneswar Jena" }]);
});
app.use("/api/v1", router);
app.listen(PORT, () => {
  console.log(`Server working on ${PORT}`);
});
