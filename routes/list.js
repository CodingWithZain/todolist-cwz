const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const exisitingUser = await User.findById(id);
    if (exisitingUser) {
      const list = new List({
        title,
        description,
        user: exisitingUser,
      });

      await list.save().then(() => res.status(200).json({ list }));
      exisitingUser.list.push(list);
      exisitingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const exisitingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (exisitingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//getTask
router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length !== 0) {
    res.status(200).json({ list: list });
  } else {
    res.status(200).json({ message: "No Task" });
  }
});
module.exports = router;
