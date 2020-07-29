const express = require('express');
const userroute = express.Router();
let collection;
userroute.post('',(req,res) => {
    collection.findOne({username: req.body.username,password: req.body.password})
    .then(result =>{
      if(result){return res.json({message: 'Login Successfull'});}
      else{ return res.status(401).json({error:{message: 'Invalid Credentials'}}); }
                   })
                    .catch(err =>{
                        return res.status(401).json({error:{message: 'Invalid Credentials'}});
                    })
})
function todoLogin(db,callback){
  collection = db.collection('todologin');
}

module.exports={userroute:userroute,todoLogin:todoLogin}; 