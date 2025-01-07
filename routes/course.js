const {Router} = require("express");

const courseRouter = Router();

    courseRouter.post("/purchase",function(req , res){ 

        res.json({
             
        })
    })
    
    courseRouter.get("/preview", function(req , res){ 
    
        res.json({
            msg:"singup endpoint"
        })
    })

module.exports = { 
    courseRouter: courseRouter,
}