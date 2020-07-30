const express = require('express');
const todosroute =express.Router();
const ObjectId = require('mongodb').ObjectID;
let collection;
const multer=require('multer');
const fs= require('fs')
const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'     
}
const storage=multer.diskStorage({  
    destination:(req,file,cb)=>{
   const isValid=MIME_TYPE_MAP[file.mimetype]
      let error=new Error("Invalid mime type")
      if(isValid){
          error=null
      }
      cb(error,"backend/images")
    },
    filename:(req,file,cb)=>{
const name=file.originalname.toLowerCase().split(' ').join('-')
const ext=MIME_TYPE_MAP[file.mimetype]
cb(null,name + '-'+ Date.now()+'.'+ ext)
    }
})
todosroute.post('',multer({storage:storage}).single("image"),(req,res) => {
    if(req.body){
        const url= req.protocol + '://' + req.get('host');
        const imagePath= url + '/images/' + req.file.filename;
        const todosObj = { todotitle: req.body.todotitle, imagepath: imagePath, todoitem: []};
        collection.insertOne(todosObj)
        .then(result =>{
            if(result.insertedCount){
                return res.json({message:'Data addded'});
            }else{
                return res.json({messsage: 'Data adding failed'});
            }
        })
        .catch(err =>{
            return res.status(500).json({error:{message: 'Server error'}});
        })
       
    }
 })
 todosroute.get('',(req,res) =>{
     collection.find({}).toArray()
     .then(result =>{
        return res.json({datas: result});
     })
     .catch(err =>{
        return res.status(500).json({error:{message: 'Server error'}});
    })
 })
 todosroute.post('/todoitem',(req,res) =>{
    const newtodoObj = {
        id: ObjectId(),
        todo: req.body.todo, 
        completed: req.body.completed
    }
    collection.updateOne({_id: ObjectId(req.body.id)},{$push:{todoitem:{todoid:newtodoObj.id,todo:newtodoObj.todo,completed:newtodoObj.completed}}})
    .then(result =>{
        return res.json({message:'Data addded'});
    })
    .catch(err =>{
        return res.status(500).json({error:{message: 'Server error'}});
    })
 })
 function todosAdd(db,callback){
    collection = db.collection('todos');
   }
module.exports = {todosroute:todosroute,todosAdd:todosAdd};