import authmodel from "../models/authmodel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
class Authcontrol {
  static register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isuser = await authmodel.findOne({ email: email });
        if (!isuser) {
          const gensalt = await bcryptjs.genSalt(10);
          const hashpassword = await bcryptjs.hash(password, gensalt);
          const adduser = authmodel({
            username,
            email,
            password: hashpassword,
          });
          const saveuser = await adduser.save();
          if (saveuser) {
            return res
              .status(201)
              .json({ message: "User Register Successfully" });
          }
        } else {
          return res.status(200).json({ message: "User Already exist" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isemail = await authmodel.findOne({ email: email });
        if (isemail) {
          if (
            isemail.email === email &&
            (await bcryptjs.compare(password, isemail.password))
          ) {
            const token = await jwt.sign({ userID: isemail._id }, "usertask", {
              expiresIn: "2d",
            });

            return res.status(200).json({
              message: "Login successfully",
              token,
              name: isemail.username,
              email: isemail.email,
            });
          } else {
            return res.status(400).json({ message: "Invalid Credential" });
          }
        } else {
          return res.status(400).json({ message: "Email not registered" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default Authcontrol;
