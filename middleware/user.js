const jwt = require("jsonwebtoken");
const {JWET_SECRET} = require("../config")

function userMiddleware(req , res , next){
    const token = req.headers.token; 
    const decoded = jwt.verify(token , JWET_SECRET);

    if(decoded){ 
        req.userId = decoded.id; 
        next();
    }else{ 
        res.json({ 
            msg:"Invalid user token",
        })
    }

}

module.exports = { 
    userMiddleware: userMiddleware,
}