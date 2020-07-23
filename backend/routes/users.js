const express = require('express');
const userroute = express.Router();
const todoArray = require('../data');
userroute.post('/login',(req,res) => {
    if(req.body.username ==='admin' && req.body.password ==='admin'){
        return res.json({message: 'Login Successfull',tododata: todoArray});
    }
    else{
        return res.status(401).json({error:{message: 'Invalid Credentials'}});
    }
})
module.exports=userroute