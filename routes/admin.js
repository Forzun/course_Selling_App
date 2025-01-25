const {Router} = require("express");
const adminRouter = Router(); 
const jwt = require("jsonwebtoken");
const {adminModel, courseModel } = require("../database/db");
const { json } = require("body-parser");
const {JWT_ADMIN_PASSWORD} = require('../config');
const { adminMiddleware } = require("../middleware/admin");
const { getTsBuildInfoEmitOutputFilePath } = require("typescript");

adminRouter.post("/signup", async function(req ,res){
    const {email , password , firstName , lastName } = req.body;

    await adminModel.create({
        email:email, 
        password: password, 
        firstName: firstName, 
        lastName: lastName,
    })

    res.json({ 
        msg:"Admin signup successfully",
    })

})

adminRouter.post("/signin", async function(req , res){
    const {email , password} = req.body; 

    const admin = await adminModel.findOne({ 
        email:email, 
        password: password,
    })

    if(admin){ 
        const token = jwt.sign({
            id: admin._id
        } ,JWT_ADMIN_PASSWORD)
        
        res.json({ 
            token:token
        })
    }else{ 
        res.json({ 
            msg:"Incorrect credentials"
        })
    }

})

// admin1 677e3ef81b3a02506c23dd4d
// admin2 


adminRouter.post("/course", adminMiddleware , async function(req ,res){ 
    const adminId = req.adminId;
    console.log(adminId)
    const {title , description , imageUrl , price }  = req.body; 

    const course = await courseModel.create({ 
        title: title, 
        description: description, 
        imageUrl: imageUrl,
        price: price, 
        creatorId: adminId,
    })

    res.json({
        msg:"Course created", 
        courseId:course._id,
    })
})

adminRouter.put("/course", adminMiddleware , async function(req , res){ 
    const adminId = req.adminId
    const {title , description , imageUrl , price , courseId } = req.body; 

// can be use findByIdAndUpdate method as well

    const course = await courseModel.updateOne({
        _id: courseId, // courseId need to match
        creatorId: adminId,// creatorId need to match
    },{
        title:title, 
        description: description, 
        imageUrl: imageUrl,
        price: price
    })

    res.json({ 
        msg:"Course updated", 
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware , async function(req ,res){
    const adminId = req.adminId; 
    console.log("id is ",adminId)


    const courses = await courseModel.find({
        creatorId: adminId,
    })
    console.log(courses)
    
        res.json({ 
            msg:"admin can see the course",
            courses: courses,
        })
})

module.exports = { 
    adminRouter: adminRouter,
}