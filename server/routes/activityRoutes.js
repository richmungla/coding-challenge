const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");
const User = mongoose.model("User");

// docker run  -e ROOT_URL=http://localhost -e MONGO_URL=mongodb://localhost:8081 --network="host"  --name activity-mongo mongo

module.exports = (app) => {
  app.post("/activity/:ownerId", async (req, res) => {
    try {
      let message = "";
      // const activity = await Activity.findOne({ name: req.body.name });

      const user = await User.findOne({ _id: req.params.ownerId });
      if (!user) {
        message = "Owner does not exist";
        return res.status(400).json({
          message,
        });
      }

      const activity = await Activity.findOne({ name: req.body.name });
      if (activity) {
        message = "This activity already exists";
        return res.status(400).json({
          message,
        });
      }

      const newActivity = await new Activity({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        time: req.body.time,
        owner: user._id,
      }).save();

      let activities = user.activities;
      activities.push(newActivity._id);

      await User.updateOne({ _id: user._id }, { activities });

      message = "Task Created Successfully";
      res.status(200).json({
        message,
      });
    } catch (error) {
      console.log("An error occured" + error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

  app.get("/activity/:ownerId", async (req, res) => {
    let message = "";
    try {
      let foundActivity = await Activity.find({
        owner: req.params.ownerId,
      }).populate("owner");

      message = `Success`;
      res.status(200).json({
        message,
        data: foundActivity,
      });
    } catch (err) {
      console.log("An error occurred getting activity" + err);
      message = "An error occurred getting activity";
      res.status(500).json({
        message,
      });
    }
  });

  app.delete("/activity/:activityId", async (req, res) => {
    let message = "";
    try {
      await Activity.findOneAndDelete(
        { _id: req.params.activityId },
        (err, activity) => {
          if (err) res.status(500).json({ error: "Internal Server Error" });
          else res.status(200).json({ message: "Successfully Removed" });
        }
      );
    } catch (err) {
      console.log("An error occurred deleting activity" + err);
      res.status(500);
    }
  });

  app.get("/activity", async (req, res) => {
    let message = "";
    try {
      let activities = await Activity.find();

      message = `Success`;
      res.status(200).json({
        message,
        data: activities,
      });
    } catch (err) {
      console.log("An error occurred getting all activities" + err);
      message = "An error occurred getting activities";
      res.status(500).json({
        message,
      });
    }
  });
};
