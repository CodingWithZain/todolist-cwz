const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/MernFinalPro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to mongodb successfully`);
  })
  .catch(() => {
    console.log(`Not Connected, Please Try Again`);
  });
