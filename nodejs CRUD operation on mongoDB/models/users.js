const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    message:{type:String}
})
module.exports=mongoose.model("users",userSchema);