import express from "express";
import Authcontrol from "../controllers/authuser.js";
import Profileuser from "../controllers/profile.js";
import multer from "multer";
import isauthticate from "../middlewares/authmiddleware.js";
import Taskcontrol from "../controllers/taskcontrol.js";
const router = express.Router();

//fileadd sec
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
//api routes
router.post("/register/user", Authcontrol.register);
router.post("/login/user", Authcontrol.login);

//authenticate router
router.post(
  "/addprofile/user",
  isauthticate,
  upload.single("profile"),
  Profileuser.adduser
);
router.get("/getprofile/user", isauthticate, Profileuser.getuser);

router.post("/addtask/user", isauthticate, Taskcontrol.addtask);
router.get("/getalltask/user", isauthticate, Taskcontrol.getalltask);
router.delete("/deleteuser/user/:id", isauthticate, Taskcontrol.deletetask);
router.put("/updateuser/user/:id", isauthticate, Taskcontrol.updatetask);
router.get("/singledata/user/:id", isauthticate, Taskcontrol.singletask);
export default router;
