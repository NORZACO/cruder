const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs') // this engine requires the fs module
const createError = require('http-errors'); // npm install http-errors --save-dev
const cookieParser = require('cookie-parser'); // npm install cookie-parser --save-dev
const bodyParser = require('body-parser')
const { Server } = require("socket.io");
const server = http.createServer(app);
const socketIO = new Server(server);
const logger = require('morgan');  // npm i morgan --save-dev
const PORT = process.env.PORT || 3000


//createRouter deleteRouter getUserById getuserRouter updateUser
const { QcreateRouter } = require('./router/createUser')
const { QdeleteRouter } = require('./router/deleteUser')
const { QgetUserById, QgetuserRouter } = require('./router/getUser')
const { QupdateUser } = require('./router/updateUser')
const { myLogger } = require('./router/log')
 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // render te ejs template
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'public/images')));
app.use('/static', express.static(path.join(__dirname, 'public')))



// app.get('/', (request, response) => {
//     response.render(path.join(__dirname, '/public/index'));
// });
socketIO.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', { SERVER_SIDE: 'SERVER SIDE WEBSOCKET=1 websocket1/main.js'.toUpperCase() });
    socket.on('another event', (data) => {
        console.log(data);
    })
})



app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})



app.use(myLogger)

// QcreateRouter QdeleteRouter QgetUserById QgetuserRouter QupdateUser
app.get('/users', QgetuserRouter)
app.get('/users/:id', QgetUserById)
app.post('/users', QcreateRouter)
app.put('/users/:id', QupdateUser)
app.delete('/users/:id', QdeleteRouter)

function setTimeVariable(app) {
    var time = new Date();
    var hr = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    app.locals.siteVariable = `${hr} : ${min} : ${sec}`;
}

setTimeVariable(app);


// app.locals.someVariable = 'MWAMUZISCODE';
function setLocalVariable(app, variableName, variableValue) {
    app.locals[variableName] = variableValue;
}

setLocalVariable(app, 'someVariable', 'MWAMUZISCODE');




server.listen(PORT, () => {
    console.log('The server is listening on Port:', PORT, '\n');
    console.log('------------- http://localhost:3000/users -------------------');
    console.log('------------- http://localhost:3000/users/1 -------------------');

});