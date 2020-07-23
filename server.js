const express = require('express');
const http = require('http');
const app = express();
const bodyparser = require('body-parser');
const UserRoutes = require('./backend/routes/users')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}))
app.use(express.static(__dirname + '/dist/clientSide'));
app.get('/',(req,res) => {
   res.sendFile('./dist/clientSide/index.html');
});
app.use('/user',UserRoutes);
const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Server created');
});