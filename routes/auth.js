const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashPassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Signup Successfully" }));
  } catch (error) {
    res.status(200).json({ message: "User already exists" });
  }
});

//Signin
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({ message: "Please Signup first " });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(200).json({ message: "Password is not correct" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "User already exists" });
  }
});

module.exports = router;
