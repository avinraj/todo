const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const UserRoutes = require('./backend/routes/users'); 
const TodosRoutes = require('./backend/routes/todos');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}))
const url = 'mongodb://localhost:27017';
const dbName = 'todolistDB';
const client = new MongoClient(url,{ useNewUrlParser: true ,useUnifiedTopology: true});  
client.connect(function(err) {
        assert.equal(null, err);
        console.log('Connected successfully to database');
      db = client.db(dbName);
      UserRoutes.todoLogin(db, function() { client.close();}); 
      TodosRoutes.todosAdd(db,function(){client.close();})
  })
app.use(express.static(__dirname + '/dist/clientSide'));
app.use('/user',UserRoutes.userroute);
app.use('/todos',TodosRoutes.todosroute);
app.use("/images",express.static(path.join("backend/images")))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'dist/clientSide/index.html'));
 });
const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Server created');
});



