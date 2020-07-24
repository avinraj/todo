const express = require('express');
const todoroute = express.Router();
const uniqID = require('uniqid');
const todoArray =[];
todoroute.post('/todoadd',(req,res) => {
    const newtodoObj = {
        id: uniqID(),
        todo: req.body.todo,
        completed: req.body.completed
    }
   todoArray.push(newtodoObj);
    return res.json({tododata: {id:newtodoObj.id,todo:newtodoObj.todo,completed:newtodoObj.completed}});
})
todoroute.put('/todoupdate',(req,res) =>{
    console.log(req.body);
    if(req.body.status){
     const  index = todoArray.findIndex(x => x.id === req.body.id);
        todoArray[index].completed = true;
    }
    else{
       const index = todoArray.findIndex(x => x.id === req.body.id);
       todoArray[index].completed = false;
    }
    console.log(todoArray);
    return res.json({tododata:todoArray});
})
todoroute.delete('/tododelete/:id',(req,res) => {
console.log(req.params.id);
const index = todoArray.findIndex(x => x.id ===req.params.id);
todoArray.splice(index,1);
    return res.json({tododata:todoArray});
})
module.exports = todoroute;