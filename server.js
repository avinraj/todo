const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const UserRoutes = require('./backend/routes/users');
const TodoRoutes = require('./backend/routes/todo');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}))
app.use(express.static(__dirname + '/dist/clientSide'));
mongoose.connect('mongodb://localhost:27017/todolistDB',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    console.log('Database successfully connected')
},
error =>{
    console.log('Database connection failed' +error)
}

)
app.use('/user',UserRoutes);
app.use('/todolist',TodoRoutes);
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'dist/clientSide/index.html'));
 });
const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Server created');
});