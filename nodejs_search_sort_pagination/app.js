const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/users')
//Databse Connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
mongoose.connection.on("connected",()=>{
    console.log("Datbase connected");
})
mongoose.connection.on("error",()=>{
    console.log("Database Error")
})
//init server
const app=express();
app.use(express.json());
app.get('/users', async(req,res)=>{
    try {
        const page=parseInt(req.query.page)-1||0;
        const limit =parseInt(req.query.limit) ||5;
        const searchvalue=req.query.searchvalue || "";
        const sort=req.query.sort || "";
        const users= await 
        User.find({username:{$regex:new RegExp('^'+searchvalue+".*"), $options:"i"}}).sort(sort)
        .limit(limit)
        .skip(page*limit);
        res.json(users);

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
app.listen(3000,(req,res)=>{
    console.log("listening on port 3000");
})

