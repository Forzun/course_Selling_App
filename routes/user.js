const { Router } = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserModel, purchaseModel, courseModel } = require("../database/db");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { userMiddleware } = require("../middleware/user");
const { ProgramUpdateLevel } = require("typescript");
const JWT_SECRET = process.env.JWET_SECRET;
const userRouter = Router();
const saltRoutes = 10;

const userZodSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

userRouter.post("/signup", async function (req, res) {
  try {
    const validateData = userZodSchema.safeParse({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const hashedPassword = await bcrypt.hash(req.body.password, saltRoutes);
    console.log(hashedPassword);

    if (validateData.success) {
      const user = new UserModel({
        ...validateData.data,
        password: hashedPassword,
      });
      user.save();
      res.json({
        user: user,
      });
    } else {
      res.json({
        error: validateData.error.errors,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/signin", async function (req, res) {
  console.log(JWT_SECRET);
  const email = req.body.email;
  const password = req.body.password;

  // what harkirat do
  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        email: email,
        id: user._id
      },
      JWT_SECRET
    );
    res.json({
      token: token,
      userId: user._id
    });
  }else{ llllllllllllllllllll
    res.json({
      msg:"user not found"
    })
  }
});

userRouter.get("/purchases", userMiddleware , async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({ 
      userId,
    })

    const courseData = await courseModel.find({ 
      _id: { $in: purchases.map(x => x.courseId)}
    })

    res.json({ 
      purchases:purchases,
      courseData: courseData
    })

});

module.exports = {
  userRouter: userRouter,
};
