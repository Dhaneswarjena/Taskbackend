import taskmodel from "../models/taskmodel.js";

class Taskcontrol {
  static addtask = async (req, res) => {
    const { title, desc } = req.body;
    try {
      if (title && desc) {
        const addtask = taskmodel({
          title,
          desc,
          user: req.user._id,
        });
        const savetask = await addtask.save();
        if (savetask) {
          return res.status(201).json({ message: "Task created Successfully" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static getalltask = async (req, res) => {
    try {
      const getalltask = await taskmodel.find({ user: req.user._id });
      if (getalltask) {
        return res.status(200).json(getalltask);
      } else {
        return res.status(400).json({ message: "Task not Found" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static deletetask = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        await taskmodel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted Successfully" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static updatetask = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        await taskmodel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({ message: "Task Update Successfully" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static singletask = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const singledata = await taskmodel.findById(id);
        return res.status(200).json(singledata);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default Taskcontrol;
