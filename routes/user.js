const { Router } = require("express");
const zod = require("zod");
const bcrypt = require('bcrypt')
require("dotenv").config();
const { UserModel } = require("../database/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWET_SECRET;
const userRouter = Router();
const saltRoutes = 10;

const userZodSchema = zod.object({
    email:zod.string().email(), 
    password: zod.string(), 
    firstName: zod.string(), 
    lastName: zod.string(),
})

userRouter.post("/signup",async function (req, res) {    
   const validateData = userZodSchema.safeParse({ 
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }); 

    const hashedPassword = await bcrypt.hash(req.body.password , saltRoutes);
    console.log(hashedPassword);

    if(validateData.success){
        const user = new UserModel({
            ...validateData.data, 
            password: hashedPassword,
        });
        user.save(); 
        res.json({
            user:user
        })
   }else{ 
    res.json({
        error:validateData.error.errors,
    })
   }
});

userRouter.post("/signin", function (req, res) {
  console.log(JWT_SECRET);
  const email = req.body.email;
  const password = req.body.password;

  const token = jwt.sign({
    email:email,
  },JWT_SECRET);

  res.json({
    token: token,
  });
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, JWT_SECRET);
  console.log(JWT_SECRET);

  if (decodedToken) {
    req.user = decodedToken;
    next();
  } else {
    res.status(401).json({
      msg: "Not authorized",
    });
  }
}

userRouter.get("/purchase", auth, function (req, res) {
  res.json({
    msg: "singup endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
