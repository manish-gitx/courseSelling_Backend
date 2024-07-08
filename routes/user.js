const { Router } = require("express");
const router = Router();
const jwt=require("jsonwebtoken")
const userMiddleware = require("../middleware/user");
const{ User,Course,password}=require("../db/index");

async function usernameTaken(req,res,next){
    const username=req.body.username;
    const isUser=await User.findOne({username:username});
    if(isUser){
        res.send("user name exist please change it")
        
    }
    else{
        next();
    }


}

// User Routes
router.post('/signup',usernameTaken,async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const User_password=req.body.password;
    try{
        const user=new User({
            username:username,
            password:User_password
        })
        await user.save();
        res.send("user created")
    }
    catch{
        res.send("sorry failed to create a user")
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const User_password=req.body.password;
    const exist= await User.findOne({username:username,password:User_password});
    if(exist){
        const token=jwt.sign({username:username},password);
        res.send(token);
    }
    else{
        res.send("sorry user dont exsist");
    }
});

router.get('/courses', async (req, res) => {
    const allCourses=await Course.find({})
    res.send(allCourses);


});
function giveToken(info){
    const w=info.split(" ");
    const token=w[1];
    const username=jwt.decode(token).username;
    return username;
}

router.post('/courses/:courseId',userMiddleware, async (req, res) => {

//for finding you can also use username in middleware and send request from it like

    //req.username=jwt.decode(token).username
        //next();
    const header=req.headers.authorization;
    const username=giveToken(header);
    try{
        const courseDetail= await Course.findById(req.params.courseId);
        if(!courseDetail){
            res.send("course not found");
        }
        const user=await User.findOne({username:username});
       const isThere=user.courses.find(item=>item.title===courseDetail.title);
       if(isThere){
        res.send("exists")
       }
       else{
        user.courses.push(courseDetail);
        await user.save();
        res.send("saved")
       }
    }
    catch{
        res.send("error");
    }
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    const header=req.headers.authorization;
    const username=giveToken(header);
    const user= await User.findOne({username:username})
    const userCourses=user.courses;
    res.send(userCourses);
});

module.exports = router