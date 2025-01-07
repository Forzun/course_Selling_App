const {Router} = require("express");
const adminRouter = Router(); 
const {adminModel } = require("../database/db")

adminRouter.post("/signup", function(req ,res){
    
    res.json({ 
        msg:"admin signup andpoint"
    })
})

adminRouter.post("/signin", function(req , res){
    res.json({
        msg:"admin login and point"
    })
})

adminRouter.post("/", function(req ,res){ 
    res.json({
        msg:"admin can see the course"
    }) 
})

adminRouter.put("/", function(req , res){ 
    res.json({ 
        msg:"admin can see the course"
    })
})

adminRouter.get("/bulk", function(req ,res){ 
    res.json({ 
        msg:"admin can see the course"
    })
})

module.exports = { 
    adminRouter: adminRouter,
}