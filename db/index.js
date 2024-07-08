const mongoose = require('mongoose');
const password="manish12";

// Connect to MongoDB
mongoose.connect("mongodb+srv://mansih:8Mmanish12@cluster0.tebut1m.mongodb.net/")

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const CourseSchema = new mongoose.Schema({
    title:String,
    Description:String,
    price:Number,
    imgLink:String
});


const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    courses:[CourseSchema]
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    password
}