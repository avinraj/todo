const express = require('express');
const todosroute =express.Router();
const ObjectId = require('mongodb').ObjectID;
let collection;
let todoArray =[];
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
        if(result.modifiedCount){
               return res.json({tododata: newtodoObj});
        }
        else{
            return res.status(500).json({error:{message: 'Server error'}});
        }
    })
    .catch(err =>{
        return res.status(500).json({error:{message: 'Server error'}});
    })
 })
 todosroute.put('/todoitem/:id',(req,res) => {
     console.log(req.params.id)
     console.log(req.body);
     if(req.body){
         collection.updateOne({_id: ObjectId(req.params.id),"todoitem.todoid" : ObjectId(req.body.todoid)},{$set:{"todoitem.$.completed":req.body.status}})
         .then(result => {
             if(result.modifiedCount){
                collection.find({_id: ObjectId(req.params.id)}).toArray()
                .then(result2 =>{
               todoArray = result2[0].todoitem;
            console.log(todoArray);  
            return res.json({tododata:todoArray}); 
            })
                }else{return res.status(500).json({error:{message: 'Server error'}});}
         })
         .catch(err =>{
            return res.status(500).json({error:{message: 'Server error'}});
        })
     }
 })
 todosroute.put('/todoitemdelete/:id',(req,res) =>{
     console.log(req.params.id)
     console.log(req.body)
     collection.updateOne({_id: ObjectId(req.params.id)},{$pull:{todoitem:{todoid: ObjectId(req.body.id)}}},{multi:true})
     .then(result =>{
         if(result.modifiedCount){
            collection.find({_id: ObjectId(req.params.id)}).toArray()
            .then(result2 =>{
                todoArray = result2[0].todoitem;
                console.log(todoArray);  
                return res.json({tododata:todoArray});  
            })
         }else{ return res.status(500).json({error:{message: 'Server error'}});}
     })
     .catch(err =>{
        return res.status(500).json({error:{message: 'Server error'}});
    })
 })
 todosroute.post('/todosname',(req,res) =>{
     console.log(req.body);
     collection.updateOne({_id: ObjectId(req.body.id)},{$set:{todotitle: req.body.todosname}})
     .then(result =>{
      if(result.modifiedCount){
       return res.json({todosname: req.body.todosname});
      }else{ return res.status(500).json({error:{message: 'Server error'}});}
     })
     .catch(err =>{
        return res.status(500).json({error:{message: 'Server error'}});
    })
 })
 function todosAdd(db,callback){
    collection = db.collection('todos');
   }
module.exports = {todosroute:todosroute,todosAdd:todosAdd};