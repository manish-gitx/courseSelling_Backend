
const{User,password,Course}=require("../db/index");
const jwt=require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const header=req.headers.authorization;
    const words=header.split(" ");
    const token=words[1];
    try{
        const check=jwt.verify(token,password);
        const exist=await User.findOne({username:check.username});
        if(exist){
            next();
        }
        else{
            console.log("user not found");
        }

        
    }
    catch{
        console.log("user is compromiseed")
    }
}

module.exports = userMiddleware;