const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../database/db");

const courseRouter = Router();

//677e3bf881f9d45370318ebe

courseRouter.post("/purchase", userMiddleware , async function (req, res) {
    const userId = req.userId
    const courseId = req.body.courseId;

    const purchased = await purchaseModel.create({
        userId, 
        courseId,
    })

    res.json({
        msg:"You have successfully bought that course"
    });

});

courseRouter.get("/preview", async function (req, res) {
    
    const courses = await courseModel.find({});

  res.json({
     courses:courses, 
  });
});

module.exports = {
  courseRouter: courseRouter,
};
