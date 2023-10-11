const mongoose=require("mongoose");
// const {mongoPass}=require('./userdata.json')
// const reqString={
//     type:String,
//     required:true
// }
const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    message:{type:String}
})
module.exports=mongoose.model("users",userSchema);