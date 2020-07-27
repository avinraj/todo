const express = require('express');
const userroute = express.Router();
userroute.post('',(req,res) => {
    if(req.body.username ==='admin' && req.body.password ==='admin'){
        return res.json({message: 'Login Successfull'});
    }
    else{
        return res.status(401).json({error:{message: 'Invalid Credentials'}});
    }
})
module.exports=userroute