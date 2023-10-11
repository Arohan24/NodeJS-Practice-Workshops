const express = require('express');
const morgan = require("morgan");

const app = express();
//brings routes
const postRoutes = require("./routes/post");
const myOwnMiddleware=(req,res,next)=>{
    console.log("This is a message from the middleware");
    next();
}
//add middleware
app.use(morgan("dev"));
app.use(myOwnMiddleware);
app.use("/", postRoutes);

const port=8080;
app.listen(port, () => {
    console.log(`This message is dislayed on port ${port}`);
});




// const {sum}=require("./Addition");
// const total =sum(20,30)
// function avg(a){
//     return a/2;
// }
// console.log(avg(total));
// let greet=helper.greet();
// console.log(greet);
// const http=require('http');
// const server=http.createServer((req,res)=>{
//     res.end("hello world from node js updated 2");
// })
// server.listen(8080);
// app.get('/',(req,res)=>{
//     res.send("Hello from express");
// });
// app.listen(8080);
// const fs=require('fs');
// const filename="target.txt";
// fs.watch(filename,()=>{
//     console.log("The file has been updated");
//     app.get('/',(req,res)=>{
//              res.send("Update notification from express");
//          });

// })
// fs.readFile(filename,(err,data)=>{
//     if(err){
//         console.log("The error is ",err);
//     }
//     console.log("The Data is ",data.toString());
// })