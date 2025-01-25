
// const auth = function(req , res , next){ 
//     const token = req.headers.token;
//     const decodedToken = jwt.verify(token , JWT_SECRET);
//     console.log(JWT_SECRET)

//     if(decodedToken){ 
//         req.user = decodedToken;
//         next()
//     }else{
//         res.status(401).json({
//             msg:"Not authorized"
//         })
//     } 
    
// }

module.exports = {
    auth: auth,
}

