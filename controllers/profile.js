import profilemodel from "../models/addprofile.js";

class Profileuser {
  static adduser = async (req, res) => {
    const { name, gender, city, email } = req.body;
    try {
      if (name && gender && city && email) {
        const addprofile = profilemodel({
          name: name,
          email: email,
          gender: gender,
          city: city,
          profile: req.file.filename,
          user: req.user._id,
        });
        const saveprofile = await addprofile.save();
        if (saveprofile) {
          return res
            .status(201)
            .json({ message: "User profile created Successfully" });
        } else {
          return res.status(400).json({ message: "User Profile not Added" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static getuser = async (req, res) => {
    try {
      const getprofileuser = await profilemodel.find({ user: req.user._id });
      if (getprofileuser) {
        return res.status(200).json(getprofileuser);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default Profileuser;
