const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email:String, 
    password:String,
    firstName:String,
    lastName: String,
})

const adminSchema = new Schema({
    email: String, 
    password:String,
    firstName:String, 
    lastName: String,
})

const courseSchema = new Schema({
    title: String, 
    description:String,
    price: String, 
    imageUrl: String, 
    creatorId: ObjectId, // only created by the creator 
})

const purchaseSchema = new Schema({
    courseId: ObjectId, 
    userId: ObjectId
})

const UserModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    UserModel:UserModel, 
    adminModel: adminModel, 
    courseModel: courseModel, 
    purchaseModel: purchaseModel
}

