// const mongoose=require('mongoose');
// const express = require("express");
// const userSchema=require("./schemas/user-schema");
// const dotenv=require("dotenv");
// const app = express();
// dotenv.config();
// app.use(express.json());
// //db connection
// mongoose.connect("mongodb://localhost:27017/test",(err)=>{
//   if(err){
//     console.log("Database connection failed",err)
//   }else{
//     console.log("Database connected");
//   }
  
// }
//   );
//   app.post('/user',async(req,res) => {
//     const check =  new userSchema({name:req.body.name,email:req.body.email})
//     const data = await check.save()
//     res.send(data)
//   })
//   app.get('/users',async(req,res)=>{
//   try{
//     const {skip,limit}=req.query
//     console.log(req.query);
//      const userData=await userSchema.find(); //.limit(parseInt(limit)).skip(parseInt(limit*skip));
//     console.log(userData);
//     res.json(userData);
//   }catch(err){
//     console.log(err.message);
//   }
//   })
// app.listen(4100,()=>{
//   console.log("Server is now connected on 4100");
// });


// const mongoose=require('mongoose');
// const express = require("express");
// const userSchema=require("./schemas/user-schema");
// const dotenv=require("dotenv");
// const app = express();
// dotenv.config();
// app.use(express.json());
// //db connection
// mongoose.connect(process.env.URI,()=>{ 
//   console.log("Database connected");
// }
//   );
//   app.get('/users',async(req,res)=>{
//   try{
    
//     const {skip,limit}=req.query
//     console.log(req.query);
//      const userData=await userSchema.find({}); //.limit(parseInt(limit)).skip(parseInt(limit*skip));
//     console.log(userData);
//     res.json(userData);
//   }catch(err){
//     console.log(err.message);
//   }
//   })
// app.listen(4100,()=>{
//   console.log("Server is now connected on 4100");
// });

// app.get("/",(req,res)=>{
//   res.send("Server Running");
// })











// const {MongoClient}=require('mongodb');
// const url='mongodb://localhost:27017';
// const database="test";
// const client= new MongoClient(url);
// async function getData(){

//   let result= await client.connect();
//   let db=result.db(database);
//   let collection=db.collection('users');
//   let response= await collection.find({}).toArray();
//   console.log(response);
// }
// getData();

// //---------------------------------------------------------------------

// const mongoose = require('mongoose')
// const { mongoPath } = require('./userdata.json')
// module.exports = async () => {
//   await mongoose.connect(mongoPath, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   return mongoose
// }
// const mongo = require('./mongo')
// const userSchema = require('./schemas/user-schema')
// const connectToMongoDB = async () => {
//   await mongo().then(async (mongoose) => {
//     try {
//       console.log('Connectedtomongodb!')
//       const results = await userSchema.find({}).sort({ messages: -1, }).limit(10)
//       console.log('RESULTS:', results)
//     } finally { mongoose.connection.close() }
//   })
// }
// connectToMongoDB()



// //---------------------------------------------------------------------------


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const DB_URL = "mongodb://localhost:27017/test";
// const User = require("./models/User");


// const app = express();

// app.use(cors());
// app.use(express.json());

// //Pagination
// app.get("/", async (req, res) => {
//   let { page, limit, sort, asc } = req.query;
//   if (!page) page = 1;
//   if (!limit) limit = 10;

//   const skip = (page - 1) * 10;
//   const users = await User.find()
//     .sort({ [sort]: asc })
//     .skip(skip)
//     .limit(limit);
//   res.send({ page: page, limit: limit, users: users });
// });

// app.listen(4000, () => {
//   console.log("server is running on port 4000");
// });