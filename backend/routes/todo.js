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
        for (let i=0;i< todoArray.length;i++){
            let obj = todoArray[i];
            if(obj.id === req.body.id){
                todoArray[i].completed = true;
            }
        }
    }
    else{
        for (let i=0;i< todoArray.length;i++){
            let obj = todoArray[i];
            if(obj.id === req.body.id){
                todoArray[i].completed = false;
            }
        }
    }
    console.log(todoArray);
    return res.json({tododata:todoArray});
})
todoroute.delete('/tododelete/:id',(req,res) => {
console.log(req.params.id);
id = req.params.id;
for (let i=0;i< todoArray.length;i++){
    let obj = todoArray[i];
    if(obj.id ===id){
       todoArray.splice(i,1)
    }
}
    return res.json({tododata:todoArray});
})
module.exports = todoroute;