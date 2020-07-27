const mongoose = require("mongoose");
const User = mongoose.model("User");
const Activity = mongoose.model("Activity");

module.exports = (app) => {
  app.post("/user", async (req, res) => {
    try {
      let message = "";
      const user = await User.findOne({ name: req.body.name });
      if (user) {
        message = "User already exists";
        res.status(400).json({
          message,
        });
      }

      const newUser = await new User({
        name: req.body.name,
      }).save();

      res.status(200).json({
        message: "User Created",
        data: newUser,
      });
    } catch (err) {
      console.log("An Error occurred creating user" + err);
      res.status(500).json({
        message: "An Error occured creating user",
      });
    }
  });

  app.get("/user/:name", async (req, res) => {
    let message = "";
    try {
      const user = await User.findOne({ name: req.params.name }).populate(
        "activities"
      );
      if (!user) {
        message = "User does not exist";
        res.status(400).json({
          message,
        });
      }
      // const activities = await Activity.find({ ownerId: req.params.id });

      message = "Success, User found";
      res.status(200).json({
        message,
        data: user,
      });
    } catch (err) {
      console.log(
        `An error occrred getting user with id ${req.header("ownerId")}` + err
      );
      message = "An error occurred";
      res.status(500).json({
        message,
      });
    }
  });

  app.get("/user", async (req, res) => {
    let message = "";
    try {
      const users = await User.find();
      if (!users) {
        message = "No users found";
        res.status(200).json({
          message,
          data: [],
        });
      }

      message = "Users found";
      res.status(200).json({
        message,
        data: users,
      });
    } catch (err) {
      message = "An error occured getting users";
      console.log(message + err);
      res.status(500).json({
        message,
      });
    }
  });
};
