const express=require("express");
const multer=require("multer");
const path=require("path");
const app=express();
const fs=require('fs');
const port=3000;
const storage= multer.diskStorage({
    destination:'./uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//upload api

const upload=multer({storage:storage,limits:{fileSize:1000000},fileFilter:function(req,file,cb){
    checkFileType(file,cb);
}}).single('myImage');

function checkFileType(file,cb){
    const filetypes=/jpeg|png/;
    const extName=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);

    if (mimetype&& extName){
        return cb (null,true);
    }else{
        cb('Error:Images Only!');
    }

}
app.put('/upload', (req, res) => {
    try {
        
        upload(req, res, (err) => {
            if (err) {
                res.send(err);
            }
            else {
                console.log("Uploaded Successfully")
                res.status(201).json(req.file);
            }
        })
    } catch (error) {
        if (error) res.status(201).send(error)
    }
})
// app.post('/upload',(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             res.render('index',{
//                 msg:err
//             });
//         }else{
//            if(req.file==undefined){
//             res.render('index',{
//                 msg:'Error:No file Selected'
//             });
//            }else{
//             res.render('index',{
//                 msg:'File Uploaded',
//             });
//            }
//         }
//     })
// })
//delete api
app.delete('/delete',(req,res)=>{
    console.log("Entered")
    const id =req.query.id;
    const path='./uploads/'+id;
    console.log(path);
    fs.unlinkSync(path); 
    res.status(201).send("File Deleted");
})


app.post('/rename', (req, res) => {
    try {
        const id = req.query.id;
        const newName = req.query.newName;
        const oldpath = './uploads/' + id;
        const newpath = './uploads/' + newName;
        fs.renameSync(oldpath, newpath, err => {
            if (err) {
                console.log(err);
                res.status(201).send(error)
            }
            res.status(201).send("File Renamed");
        })
    } catch (error) {
        if (error) res.status(201).send(error)
    }
})
// app.post("/rename",(req,res)=>{
//     const oldFileName=req.query.oldFileName;
//     const newFileName=req.query.newFileName;
//     const oldName='./uploads'+oldFileName;
//     const newName='./uploads'+newFileName;
//     if(fs.existsSync(oldName)){
//         fs.rename(oldName,newName,(error)=>{
//             if(error){
//                 return res.status(500).send({
//                     message:"error renaming failed",
//                     error:error
//                 });
//             }

//             return res.status(200).send({
//                 message:"File Renamed Successfully"
//             });
//         });
//     }else{
//         return res.status(404).send({
//             message:"file not found"
//         });
//     }
// });
// app.delete("/delete/:filename",(req,res)=>{
//     const filePath=`./uploads/${req.params.filename}`;
//     fs.unlinkSync(filePath,(err)=>{
//         if(err){
//             return res.status(404).send("Image not found"); 
//         }
//         console.log(err);
//         res.send("Image Deleted Successfully");
//     });
// }); 
 
app.set('view engine','ejs');
app.use(express.static('./public'))
app.get('/',(req,res)=> res.render('index'))
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})