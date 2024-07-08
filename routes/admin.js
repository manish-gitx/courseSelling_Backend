const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt=require("jsonwebtoken");
const{ Admin,User,Course,password}=require("../db/index");

async function exist(acc_name,password){
    const exsit=await Admin.findOne({username:acc_name,
        password:password
    });
    if(exsit===null){
        return false;
    }
    return true;
}
async function usernameTaken(req,res,next){
    const username=req.body.username;
    const isUser=await Admin.findOne({username:username});
    if(isUser){
        res.send("user name exist please change it")
    }
    else{
        next();
    }


}

// Admin Routes
router.post('/signup',usernameTaken,async(req, res) => {
    const info=req.body;
    try{
        const adminUser=new Admin({username:info.username,password:info.password});
       await adminUser.save();
        res.send("saved succesfully")
    }
    catch{
        res.send("incorrect inputs")
    }
});

router.post('/signin', async (req, res) => {
    const username=req.body.username;
    const admin_password=req.body.password;
    const isExsist=await exist(username,admin_password);
    if(isExsist){
        var token=jwt.sign({username:username},password);
        res.send(token);
    }
    else{
        res.send("user doesnt exsit")
    }

    // Implement admin signup logic

});

router.post('/courses', adminMiddleware, async(req, res) => {
    const info=req.body;
    try{
        const saveCourse=new Course({
            title:info.title,
            Description:info.description,
            price:info.price,
            imgLink:info.link
        })
        await saveCourse.save();
        res.send("sucess adminsaved")
    }
    catch{
        res.send("failed")
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    try{
        const allCourses= await Course.find({});
        res.send(allCourses)

    }
    catch{
        res.send("error");
    }
});

module.exports = router;