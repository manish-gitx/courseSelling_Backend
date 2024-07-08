// Middleware for handling auth
const jwt=require("jsonwebtoken")
const {Admin,password}=require("../db/index");
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const request=req.headers.authorization;
    const token=request.slice(7);
    try{
        var check=jwt.verify(token,password);
        var username= await Admin.findOne({username:check.username});

        if(username){
            
            next();
        }
        else{
            res.status(404).send("admin wont exist")
        }
    }
    catch{
        res.send("token has been compromised")
    }


}

module.exports = adminMiddleware;