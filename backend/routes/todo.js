const express = require('express');
const todoroute = express.Router();
const ObjectId = require('mongodb').ObjectID;
const todoArray =[];
let collection;
todoroute.post('',(req,res) => {
    const newtodoObj = {
        todo: req.body.todo,
        completed: req.body.completed
    }
collection.insertOne({todo:newtodoObj.todo,completed:newtodoObj.completed})
.then(result=>{
    if(result){
        console.log(result.ops);
        const addedtodoObj ={
            id:result.ops[0]._id,
            todo:result.ops[0].todo,
            completed:result.ops[0].completed
        }
        todoArray.push(addedtodoObj);
      return  res.json({tododata: {id:addedtodoObj.id,todo:addedtodoObj.todo,completed:addedtodoObj.completed}});
    }else{
        return res.status(500).json({error:{message: 'Server error'}});
    }
}) 
    
})
todoroute.put('/:id',(req,res) =>{
    console.log(req.params.id);
    if(req.body){
       
        collection.updateOne({_id:ObjectId(req.params.id)},{$set:{completed:req.body.status}})
        .then(result => {
            console.log(result);
            const index = todoArray.findIndex(x => x.id == req.params.id);
            if(req.body.status){
                todoArray[index].completed = true;
            }
            else {
                todoArray[index].completed = false;
            }
            return res.json({tododata:todoArray});
        })
        .catch(err =>{
            return res.status(500).json({error:{message: 'Server error'}});
        })
    }
})
todoroute.delete('/:id',(req,res) => {
collection.deleteOne({_id:ObjectId(req.params.id)})
.then(result =>{
   if(result){
      console.log("todo array",todoArray);
      const index = todoArray.findIndex(x => x.id == req.params.id)
      todoArray.splice(index,1)
      return res.json({tododata:todoArray});
   }
   else{
    return res.status(500).json({error:{message: 'Server error'}});
   }
})
.catch(err =>{
    return res.status(500).json({error:{message: 'Server error'}});
})
})
function todoAdd(db,callback){
    collection = db.collection('todolist');
   }
module.exports = {todoroute:todoroute,todoAdd:todoAdd};